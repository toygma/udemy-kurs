import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Doctor from "../models/doctor.model";
import Patient from "../models/patient.model";
import Appointment from "../models/appointment.model";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY bulunamadı");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

const getCheckoutSession = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { doctorId, appointmentId } = req.params;

    if (!appointmentId || !doctorId) {
      return next(new ErrorHandler("Doktor Id ve randevu ID gereklidir", 400));
    }

    const patientId = req.user?._id;

    if (!patientId) {
      return next(new ErrorHandler("Hasta ID gereklidir", 400));
    }

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    const appointment = await Appointment.findById(appointmentId);

    if (!doctor || !patient || !appointment) {
      return next(new ErrorHandler("verilere ulaşılamadı", 400));
    }

    if (appointment.isPaid === "paid") {
      return next(new ErrorHandler("Bu randevu zaten ödenmiş", 400));
    }

    if (appointment.patient._id.toString() !== patientId.toString()) {
      return next(new ErrorHandler("Bu randevu size ait değil", 403));
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/randevular/basarili?session_id=${appointmentId}`,
      cancel_url: `${process.env.FRONTEND_URL}/randevular/iptal?cancelled=true`,
      customer_email: patient.email,
      client_reference_id: appointmentId,
      metadata: {
        appointmentId: appointmentId.toString(),
        doctorId: doctorId.toString(),
        patientId: patientId.toString(),
        patientName: patient.name,
        doctorName: doctor.name,
      },
      line_items: [
        {
          price_data: {
            currency: "try",
            unit_amount: Math.round(Number(doctor.fee) * 100),
            product_data: {
              name: `${doctor.name} ile randevu`,
              description: `${doctor.speciality} - ${new Date(
                appointment.date
              ).toLocaleDateString("tr-TR")} - ${appointment.timeSlot}`,
              images:[doctor.image.url],
            },
          },
          quantity: 1,
        },
      ],
    });

    appointment.session = session.id;
    await appointment.save();

    res.status(200).json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
    });
  }
);

export default { getCheckoutSession };
