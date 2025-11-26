import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";

const createAppointment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { doctorId, date, timeSlot } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("Kullanıcı bulunamadı", 400));
    }

    if (!doctorId || !date || !timeSlot) {
      return next(new ErrorHandler("Alanlar zorunlu", 400));
    }

    // Aynı doktor, tarih ve saat için randevu var mı kontrol et
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      status: { $ne: "cancelled" }, // İptal edilmemiş randevular
    });

    if (existingAppointment) {
      return next(
        new ErrorHandler("Bu saat dilimi için randevu zaten mevcut", 409)
      );
    }

    const appointment = await Appointment.create({
      patient: userId,
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
    });

    await appointment.populate([{ path: "patient" }, { path: "doctor" }]);

    await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { appointments: appointment._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Randevu başarıyla oluşturuldu",
      appointment,
    });
  }
);

const updateAppointmentStatus = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { newStatus } = req.body; // Yeni statüyü (örneğin "cancelled" veya "confirmed") request body'den almalısınız
    const user = req.user;

    // 1. Gerekli Alan Kontrolü
    if (!id || !user || !newStatus) {
      return next(
        new ErrorHandler(
          "Gerekli bilgiler (id, kullanıcı veya yeni statü) eksik.",
          400
        )
      );
    }

    // İzin verilen statüleri kontrol edin
    const allowedStatuses = ["cancelled", "confirmed"];
    if (!allowedStatuses.includes(newStatus)) {
      return next(
        new ErrorHandler(
          `Geçersiz statü: ${newStatus}. Yalnızca 'cancelled' veya 'confirmed' olabilir.`,
          400
        )
      );
    }

    // 2. Randevuyu Bulma ve Kontrol (Düzeltildi: İlk Bulma)
    // findById, ObjectId bekler, bu yüzden {id} yerine id kullanın.
    let appointment = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("Randevu bulunamadı.", 404)); // Randevu yoksa hemen hata döndür
    }

    // 3. Yetkilendirme Kontrolü
    const isPatient =
      user.role === "patient" &&
      appointment.user.toString() === user._id.toString();
    const isDoctor =
      user.role === "doctor" &&
      appointment.doctor.toString() === user._id.toString();

    // Sadece randevunun sahibi (hasta) veya doktoru yetkilidir
    if (!isPatient && !isDoctor) {
      return next(
        new ErrorHandler(
          "Yalnızca kendi randevularınızı güncelleyebilirsiniz.",
          403
        )
      );
    }

    // Statüye Göre Yetkilendirme Kontrolü (İstenen gereksinime göre eklendi)
    if (newStatus === "confirmed" && !isDoctor) {
      // Sadece doktorlar randevuyu onaylayabilir
      return next(
        new ErrorHandler("Randevuyu yalnızca doktor onaylayabilir.", 403)
      );
    }

    if (newStatus === "cancelled") {
      // İptal durumunda, hem hasta hem de doktorun iptal yetkisi var
      // (Hasta/Doktor kontrolü zaten yapılmıştı)

      // Randevu doktordan çekilmeli (SADECE iptal durumunda)
      await Doctor.findByIdAndUpdate(appointment.doctor, {
        $pull: { appointments: appointment._id },
      });
    }
    if (newStatus === "confirmed") {
      appointment.isPaid = "paid";
      await appointment.save();
    }
    // 4. Randevu Durumunu Güncelleme (Düzeltildi: Tekrar Tanımlama Yok)
    appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: newStatus }, // Body'den gelen yeni statü
      { new: true }
    );

    // 5. Başarı Yanıtı (Düzeltildi: Dinamik mesaj)
    const successMessage = `Randevu başarıyla ${
      newStatus === "cancelled" ? "iptal edildi" : "onaylandı"
    }.`;

    res.status(200).json({
      success: true,
      message: successMessage,
      data: appointment,
    });
  }
);

export default {
  createAppointment,
  updateAppointmentStatus,
};
