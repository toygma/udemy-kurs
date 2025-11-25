import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import sendToken from "../utils/sendToken";
import Doctor from "../models/doctor.model";

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

    if (!name || !email || !password || !phone || !speciality || !experience || !about || !fee || !education || !services || !awards || !workingHours) {
      return next(new ErrorHandler("Tüm alanlar zorunludur.", 400));
    }

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return next(new ErrorHandler("Bu email zaten kullanılıyor", 400));
    }

    const doctor = await Doctor.create({
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

    sendToken({
      user: doctor,
      statusCode: 201,
      res,
    });
  }
);

export default {
  register,
};