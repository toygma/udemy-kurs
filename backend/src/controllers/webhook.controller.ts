import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";
import Patient from "../models/patient.model";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY bulunamadı");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

export const handleStripeWebhook = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers["stripe-signature"];

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      return next(new ErrorHandler("STRIPE WEBHOOK SECRET tanımlı değil", 500));
    }

    if (!sig) {
      return next(new ErrorHandler("stripe signature eksik", 500));
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (error: any) {
      return res.status(400).json({
        error: `Webhook error ${error.message}`,
      });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const appointmentId = session.metadata?.appointmentId;
      const doctorId = session.metadata?.doctorId;
      const patientId = session.metadata?.patientId;

      const appointment = await Appointment.findById(appointmentId);

      if (!appointmentId) {
        return next(new ErrorHandler("randevu ID gereklidir", 400));
      }

      appointment.status = "confirmed";
      appointment.isPaid = "paid";

      appointment.paymentId = session.payment_intent as string;
      await appointment.save();

      if (doctorId) {
        await Doctor.findByIdAndUpdate(
          doctorId,
          {
            isPaid: "paid",
          },
          { new: true }
        );
      }

      if (patientId) {
        await Patient.findByIdAndUpdate(
          patientId,
          { paymentId: session.payment_intent as string },
          { new: true }
        );
      }
    }

    return res.status(200).json({ received: true });
  }
);

