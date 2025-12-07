import { Request, Response } from "express";
import Stripe from "stripe";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";
import Patient from "../models/patient.model";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY değişkeni bulunamadı");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.error("❌ STRIPE_WEBHOOK_SECRET tanımlı değil!");
    return res.status(500).json({ error: "Stripe webhook secret not set" });
  }

  if (!sig) {
    console.error("❌ Stripe signature eksik!");
    return res.status(400).json({ error: "Stripe signature missing" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error: any) {
    console.error("❌ Webhook signature doğrulama hatası:", error.message);
    return res.status(400).json({
      error: `Webhook Error: ${error.message}`,
    });
  }

  console.log(`✅ Webhook alındı: ${event.type} [${event.id}]`);

  // checkout.session.completed event'ini işle
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const appointmentId = session.metadata?.appointmentId;
    const doctorId = session.metadata?.doctorId;
    const patientId = session.metadata?.patientId;

    console.log("📦 Session metadata:", { appointmentId, doctorId, patientId });

    if (!appointmentId) {
      console.error("❌ appointmentId eksik!");
      return res.status(400).json({ error: "No appointmentId in metadata" });
    }

    try {
      // Appointment'ı bul ve güncelle
      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        console.error(`❌ Appointment bulunamadı: ${appointmentId}`);
        return res.status(404).json({ error: "Appointment not found" });
      }

      console.log(`🔄 Appointment güncelleniyor: ${appointmentId}`);

      // Appointment'ı güncelle
      appointment.status = "confirmed";
      appointment.isPaid = "paid";
      appointment.paymentId = session.payment_intent as string;
      await appointment.save();

      console.log(`✅ Appointment güncellendi: ${appointmentId}`);


      // Doctor'ı güncelle (opsiyonel - isPaid alanı varsa)
      if (doctorId) {
        try {
          await Doctor.findByIdAndUpdate(doctorId, {
            isPaid: "paid",
          });
          console.log(`✅ Doctor güncellendi: ${doctorId}`);
        } catch (err) {
          console.error("⚠️ Doctor güncellenemedi:", err);
        }
      }

      console.log(`🎉 Ödeme başarıyla tamamlandı!`);

      // TODO: Email bildirimi gönder
      // await sendAppointmentConfirmationEmail(appointment);

    } catch (error: any) {
      console.error("❌ Webhook işleme hatası:", error.message);
      console.error("Stack:", error.stack);
      return res.status(500).json({
        error: `Error processing webhook: ${error.message}`,
      });
    }
  }

  // Diğer event'ler için
  return res.status(200).json({ received: true });
};