import { Request, Response } from "express";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";
import Stripe from "stripe";
import Patient from "../models/patient.model";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY değişkeni bulunamadı");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

const getCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { doctorId, appointmentId } = req.params;

    // Validasyon
    if (!appointmentId || !doctorId) {
      return res.status(400).json({ 
        success: false,
        message: "doctorId ve appointmentId gereklidir" 
      });
    }

    // User ID'yi authenticated user'dan al
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: "Kullanıcı doğrulanamadı" 
      });
    }

    // Database sorguları - ObjectId kullanmana gerek yok
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(userId);
    const appointment = await Appointment.findById(appointmentId);

    // Kontroller
    if (!doctor) {
      return res.status(404).json({ 
        success: false,
        message: "Doktor bulunamadı" 
      });
    }

    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: "Hasta bulunamadı" 
      });
    }

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: "Randevu bulunamadı" 
      });
    }

    // Zaten ödenmiş mi kontrol et
    if (appointment.isPaid === "paid") {
      return res.status(400).json({
        success: false,
        message: "Bu randevu zaten ödenmiş",
      });
    }

    // Randevu hasta'ya ait mi kontrol et
    if (appointment.patient.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Bu randevu size ait değil",
      });
    }

    console.log("💳 Checkout session oluşturuluyor:", {
      appointmentId,
      doctorId,
      patientId: userId,
      fee: doctor.fee,
    });

    // Checkout session oluştur
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/randevular/basarili?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/randevular/iptal?canceled=true`,
      customer_email: patient.email,
      client_reference_id: appointmentId, // ÖNEMLİ: appointmentId olmalı
      metadata: {
        appointmentId: appointmentId,
        doctorId: doctorId,
        patientId: userId.toString(),
        patientName: patient.name,
        doctorName: doctor.name,
      },
      line_items: [
        {
          price_data: {
            currency: "try",
            unit_amount: Math.round(Number(doctor.fee) * 100), // Kuruş cinsine çevir
            product_data: {
              name: `Dr. ${doctor.name} ile Randevu`,
              description: `${doctor.speciality} - ${new Date(appointment.date).toLocaleDateString('tr-TR')} ${appointment.timeSlot}`,
              images: doctor.image?.url ? [doctor.image.url] : [],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Session ID'yi appointment'a kaydet
    appointment.session = session.id;
    await appointment.save();

    console.log("✅ Checkout session oluşturuldu:", session.id);

    return res.status(200).json({ 
      success: true, 
      sessionId: session.id,
      sessionUrl: session.url 
    });

  } catch (error: any) {
    console.error("❌ Stripe checkout hatası:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Ödeme oturumu oluşturulamadı",
    });
  }
};

export default { getCheckoutSession };