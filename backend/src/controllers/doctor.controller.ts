import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Doctor from "../models/doctor.model";
import moment from "moment";
import Appointment from "../models/appointment.model";

const register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      email,
      password,
      phone,
      speciality,
      experience,
      about,
      fee,
      education,
      services,
      address,
      awards,
      workingHours,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !speciality ||
      !experience ||
      !about ||
      !fee ||
      !education ||
      !services ||
      !awards ||
      !workingHours ||
      !address
    ) {
      return next(new ErrorHandler("Tüm alanlar zorunludur.", 400));
    }

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return next(new ErrorHandler("Bu email zaten kullanılıyor", 400));
    }

    await Doctor.create({
      name,
      email,
      password,
      phone,
      speciality,
      experience,
      about,
      fee,
      education,
      services,
      address,
      awards,
      workingHours,
    });

    res.status(201).json({
      success: true,
      message:
        "Doktor başvurunuz başarıyla alındı. Yönetici onayından sonra giriş yapabilirsiniz.",
    });
  }
);

const getAppointments = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    const appointments = await Appointment.find({ doctor: userId })
      .populate("patient")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  }
);

const getDoctorAvailability = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return next(new ErrorHandler("Doktor bulunamadı", 404));
    }

    const today = moment().startOf("day");
    const sevenDaysLater = moment().add(7, "days").endOf("day");

    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: today.toDate(), $lte: sevenDaysLater.toDate() },
      status: { $in: ["pending", "confirmed"] },
    }).select("date timeSlot");

    const bookedMap = new Map<string, Set<string>>();

    bookedAppointments.forEach((apt) => {
      const dateStr = moment(apt.date).format("YYYY-MM-DD");
      if (!bookedMap.has(dateStr)) {
        bookedMap.set(dateStr, new Set());
      }
      bookedMap.get(dateStr)!.add(apt.timeSlot);
    });

    const availability = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = moment(today).add(i, "days");
      const dateStr = currentDate.format("YYYY-MM-DD");
      const dayName = currentDate.format("dddd");

      const schedule = doctor.workingHours.find(
        (wh: any) => wh.day.toLowerCase() === dayName.toLowerCase()
      );

      if (!schedule?.isWorking) {
        availability.push({
          date: dateStr,
          dayName,
          isWorking: false,
          slots: [],
        });
        continue;
      }

      const slots = [];
      let currentSlot = moment(schedule.startTime, "HH:mm");
      let endTime = moment(schedule.endTime, "HH:mm");
      const duration = 30;
      const bookedTimes = bookedMap.get(dateStr) || new Set();

      while (currentSlot.isBefore(endTime)) {
        const slotEndTime = moment(currentSlot).add(duration, "minutes");

        const slotString = `${currentSlot.format(
          "HH:mm"
        )}- ${slotEndTime.format("HH:mm")}`;

        const slotDateTime = moment(
          `${dateStr} ${currentSlot.format("HH:mm")}`,
          "YYYY-MM-DD HH:mm"
        );

        slots.push({
          time: slotString,
          isAvailable:
            !bookedTimes.has(slotString) && slotDateTime.isAfter(moment()),
        });

        currentSlot = slotEndTime;
      }

      availability.push({
        date: dateStr,
        dayName: currentDate.format("dddd"),
        isWorking: true,
        slots,
      });
    }

    res.status(200).json({
      success: true,
      availability,
    });
  }
);

export default {
  register,
  getAppointments,
  getDoctorAvailability,
};
