import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import Doctor from "../models/doctor.model";
import Appointment from "../models/appointment.model";
import Review from "../models/review.model";
import Patient from "../models/patient.model";
import ErrorHandler from "../utils/errorHandler";
import { upload_file } from "../utils/cloudinary";
import ApiFilter from "../utils/apiFilter";

const getPendingDoctors = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const pendingDoctors = await Doctor.find({
      approvalStatus: "pending",
    })
      .select("name email speciality createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pendingDoctors.length,
      data: pendingDoctors,
    });
  }
);

const doctorAdd = catchAsyncError(
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
      patients,
      address,
      awards,
      workingHours,
      images,
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
      !images ||
      !patients
    ) {
      return next(new ErrorHandler("Tüm alanlar zorunludur.", 400));
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Bu email zaten kullanılıyor.",
      });
    }

    const uploadPromises = images.map((image: any) =>
      upload_file(image, "mern-health/doctors")
    );
    const urls = await Promise.all(uploadPromises);

    const doctor = await Doctor.create({
      name,
      email,
      password,
      speciality,
      images: urls,
      experience,
      about,
      education,
      services,
      address,
      phone,
      fee,
      patients,
      awards,
      workingHours,
    });

    res.status(201).json({ success: true, doctor });
  }
);

const approveDoctor = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return next(new ErrorHandler("Doktor bulunamadı", 404));
    }

    if (doctor.approvalStatus === "approved") {
      return next(new ErrorHandler("Bu doktor zaten onaylanmış", 400));
    }

    doctor.approvalStatus = "approved";

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doktor başarıyla onaylandı",
      data: doctor,
    });
  }
);

const rejectDoctor = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return next(new ErrorHandler("Doktor bulunamadı", 404));
    }

    if (doctor.approvalStatus === "rejected") {
      return next(new ErrorHandler("Bu doktor zaten reddedilmiş", 400));
    }

    doctor.approvalStatus = "rejected";
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doktor başarıyla reddedildi",
      data: doctor,
    });
  }
);

const toggleUserStatus = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let user = (await Doctor.findById(id)) || (await Patient.findById(id));

    if (!user) {
      return next(new ErrorHandler("Kullanıcı bulunamadı", 404));
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Kullanıcı ${
        user.isActive ? "aktif" : "engellenmiş"
      } duruma getirildi`,
      data: user,
    });
  }
);

const toggleUserRole = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { role } = req.body;

    let user = (await Doctor.findById(id)) || (await Patient.findById(id));

    if (!user) {
      return next(new ErrorHandler("Kullanıcı bulunamadı", 404));
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Kullanıcının rolü başarıyla ${role} olarak değiştirildi`,
      data: user,
    });
  }
);

const getAnalyticsData = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const resPerPage = Number(req.query.limit) || 5;

    const reviewsData = await Review.countDocuments();

    const patientsData = await Patient.countDocuments();

    const doctorsData = await Doctor.countDocuments();

    const appointmentsData = await Appointment.countDocuments();

    const appointmentByDoctor = await Appointment.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },
      {
        $group: {
          _id: "$doctor._id",
          doctor: {
            $first: {
              name: "$doctor.name",
              speciality: "$doctor.speciality",
            },
          },
          totalAppointments: { $sum: 1 },
        },
      },
      { $sort: { totalAppointments: -1 } },
    ]);

    const apiFilter = new ApiFilter(
      Appointment.find()
        .populate("doctor", "name speciality appointments")
        .populate("patient", "name")
        .sort({ createdAt: -1 }),
      req.query
    ).pagination(resPerPage);

    const allRecentAppointments = await apiFilter.query;

    const recentThreeAppointments = await Appointment.find()
      .populate("doctor", "name speciality appointments")
      .populate("patient", "name")
      .sort({ createdAt: -1 })
      .limit(3);

    return res.status(200).json({
      success: true,
      stats: {
        totalDoctors: doctorsData,
        totalPatients: patientsData,
        totalReviews: reviewsData,
        totalAppointments: appointmentsData,
      },
      appointmentByDoctor,
      allRecentAppointments,
      recentThreeAppointments,
    });
  }
);

export default {
  getPendingDoctors,
  doctorAdd,
  approveDoctor,
  toggleUserStatus,
  getAnalyticsData,
  rejectDoctor,
  toggleUserRole,
};
