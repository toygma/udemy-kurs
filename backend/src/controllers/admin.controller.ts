import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import Review from "../models/review.model";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";
import Patient from "../models/patient.model";
import ApiFilter from "../utils/apiFilter";
import ErrorHandler from "../utils/errorHandler";
import { upload_file } from "../utils/cloudinary";

const getAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const resPerPage = Number(req.query.limit) || 5;
    const currentUserId = req.user._id;

    // Toplam kullanıcı sayısını hesapla
    const doctorCount = await Doctor.countDocuments({ _id: { $ne: currentUserId } });
    const patientCount = await Patient.countDocuments({ _id: { $ne: currentUserId } });
    const allUserCount = doctorCount + patientCount;

    // Pagination için hesaplamalar
    const currentPage = Number(req.query.page) || 1;
    const totalPages = Math.ceil(allUserCount / resPerPage);

    // ApiFilter ile doctors
    const doctorFilter = new ApiFilter(
      Doctor.find({ _id: { $ne: currentUserId } })
        .select("name email speciality role isActive createdAt")
        .sort({ createdAt: -1 }),
      req.query
    ).pagination(resPerPage);

    const doctors = await doctorFilter.query;

    // ApiFilter ile patients
    const patientFilter = new ApiFilter(
      Patient.find({ _id: { $ne: currentUserId } })
        .select("name email role isActive createdAt")
        .sort({ createdAt: -1 }),
      req.query
    ).pagination(resPerPage);

    const patients = await patientFilter.query;

    // İki diziyi birleştir ve tarihe göre sırala
    const allUsers = [...doctors, ...patients];
    allUsers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());


    res.status(200).json({
      success: true,
      data: allUsers,
      pagination: {
        totalUsers: allUserCount,
        resPerPage,
        currentPage,
        totalPages,
      },
    });
  }
);

const getAnalyticsData = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const resPerPage = Number(req.query.limit) || 5;

    const reviewsData = await Review.countDocuments();

    const appointmentsData = await Appointment.countDocuments();

    const doctorsData = await Doctor.countDocuments();

    const patientsData = await Patient.countDocuments();

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

    const currentPage = Number(req.query.page) || 1;
    const totalPages = Math.ceil(appointmentsData / resPerPage);

    return res.status(200).json({
      stats: {
        totalDoctors: doctorsData,
        totalPatients: patientsData,
        totalReviews: reviewsData,
        totalAppointments: appointmentsData,
      },
      appointmentByDoctor,
      allRecentAppointments,
      recentThreeAppointments,
      pagination: {
        totalAppointments: appointmentsData,
        resPerPage,
        currentPage,
        totalPages,
      },
    });
  }
);

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

const approveDoctor = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return next(new ErrorHandler("Doktor Bulunamadı", 404));
    }

    if (doctor.approvalStatus === "approved") {
      return next(new ErrorHandler("Bu doktor zaten onaylandı", 400));
    }

    doctor.approvalStatus = "approved";
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doktor başarıyla onaylandı",
    });
  }
);

const rejectDoctor = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return next(new ErrorHandler("Doktor Bulunamadı", 404));
    }

    if (doctor.approvalStatus === "rejected") {
      return next(new ErrorHandler("Bu doktor zaten reddedildi", 400));
    }

    doctor.approvalStatus = "rejected";
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doktor başarıyla reddedildi",
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
        user.isActive ? "engellenmiş" : "aktif"
      } duruma getirildi.`,
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
      message: `Kullanıcının rolü başarıyla ${role} olarak değiştirildi.`,
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
      address,
      awards,
      workingHours,
      image,
      patients,
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
      !image ||
      !patients
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

    const doctor = await Doctor.create({
      name,
      email,
      password,
      speciality,
      image: uploadedImage,
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

export default {
  getAnalyticsData,
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  toggleUserStatus,
  toggleUserRole,
  doctorAdd,
  getAllUsers,
};
