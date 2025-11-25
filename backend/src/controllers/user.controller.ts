import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import sendToken from "../utils/sendToken";
import Patient from "../models/patient.model";
import Doctor from "../models/doctor.model";


const login = catchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
  const { email, password,role } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Lütfen Email veya şifrenizi giriniz", 400));
  }

  let user

  if (role === 'patient') {
    user = await Patient.findOne({ email }).select("+password");;
  } else if (role === 'doctor') {
    user = await Doctor.findOne({ email }).select("+password");;
  }
  

  if (!user) {
    return next(new ErrorHandler("Email veya şifre yanlış.", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Şifre yanlış.", 401));
  }
  if (user.isActive === false) {
    return next(new ErrorHandler("Hesabınız engellenmiştir..", 401));
  }
  sendToken({
      user,
      statusCode: 201,
      res,
    });
});

const logout = catchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Çıkış Yapıldı",
  });
});

export default {
    login,
    logout
}