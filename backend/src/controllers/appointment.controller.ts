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
      return next(new ErrorHandler("Kullanıcı bulunamadı", 401));
    }

    if (!doctorId || !date || !timeSlot) {
      return next(new ErrorHandler("Alanlar zorunlu", 400));
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      status: { $ne: "cancelled" },
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
    const { newStatus } = req.body;

    const user = req.user;

    if (!id) {
      return next(new ErrorHandler("id bulunamadı", 400));
    }

    if (!newStatus || !user) {
      return next(new ErrorHandler("statü veya user bilgisi eksik", 400));
    }

    const allowedStatuses = ["cancelled", "confirmed"];
    if (!allowedStatuses.includes(newStatus)) {
      return next(
        new ErrorHandler(
          `Geçersiz statü: ${newStatus}.Yalnızca cancelled veya confirmed olabilir`,
          400
        )
      );
    }

    let appointment = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("Randevu bulunamadı", 404));
    }

    const isPatient =
      user.role === "patient" &&
      appointment.patient.toString() === user._id.toString();

    const isDoctor =
      user.role === "doctor" &&
      appointment.doctor.toString() === user._id.toString();

    if (!isPatient && !isDoctor) {
      return next(
        new ErrorHandler(
          "Yalnızca kendi randevularınızı güncelleyebilirsiniz",
          403
        )
      );
    }

    if (newStatus === "confirmed" && !isDoctor) {
      appointment.isPaid = "paid";
      await appointment.save();
      return next(new ErrorHandler("Yalnızca doktor onaylayabilir.", 403));
    }

    if (newStatus === "cancelled") {
      await Doctor.findByIdAndUpdate(appointment.doctor, {
        $pull: { appointments: appointment._id },
      });
    }

    appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

  

    res.status(200).json({
      success: true,
      data: appointment,
    });
  }
);

const getAppointmets = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("Kullanıcı bulunamadı", 401));
    }

    const appointments = await Appointment.find({ patient: userId })
      .populate("doctor")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  }
);

const getDoctorAppointments = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("Kullanıcı bulunamadı", 401));
    }

    if (req.user?.role !== "doctor") {
      return next(
        new ErrorHandler("Bu işlem için doktor yetkisi gerekli", 403)
      );
    }

    const appointments = await Appointment.find({ doctor: userId })
      .populate("patient")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  }
);

export default {
  createAppointment,
  updateAppointmentStatus,
  getAppointmets,
  getDoctorAppointments,
};
