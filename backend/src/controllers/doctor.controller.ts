import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Doctor from "../models/doctor.model";
import moment from "moment";
import Appointment from "../models/appointment.model";
import { upload_file } from "../utils/cloudinary";

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
      image,
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
      !address ||
      !image
    ) {
      return next(new ErrorHandler("Tüm alanlar zorunludur.", 400));
    }

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return next(new ErrorHandler("Bu email zaten kullanılıyor", 400));
    }

    let uploadedImage: { public_id: string; url: string } | undefined;

    if (image) {
      const folder = "udemy-kurs";
      const uploaded = await upload_file(image, folder);
      uploadedImage = { public_id: uploaded.public_id, url: uploaded.url };
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
      image: uploadedImage,
    });

    res.status(201).json({
      success: true,
      message:
        "Doktor başvurunuz başarıyla alındı. Yönetici onayından sonra giriş yapabilirsiniz.",
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

const getAllDoctors = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  }
);

const getDoctorById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    res.status(200).json({
      success: true,
      data: doctor,
    });
  }
);

export default {
  register,
  getDoctorAvailability,
  getAllDoctors,
  getDoctorById,
};
