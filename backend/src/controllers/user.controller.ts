import catchAsyncError from "../middlewares/catch.middleware";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import Patient from "../models/patient.model";
import Doctor from "../models/doctor.model";
import sendToken from "../utils/sendToken";

const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Lütfen email veya şifrenizi giriniz", 400));
    }

    let user;

    if (role === "patient") {
      user = await Patient.findOne({ email }).select("+password");
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email }).select("+password");
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

    if (role === "doctor") {
      if (user.approvalStatus === "pending") {
        return next(
          new ErrorHandler(
            "Hesabınız henüz onaylanmamıştır. Lütfen admin onayını bekleyiniz.",
            403
          )
        );
      } else if (user.approvalStatus === "rejected") {
        return next(new ErrorHandler(`Hesabınız reddedilmiştir`, 403));
      }
    }

    sendToken({
      user,
      statusCode: 201,
      res,
    });
  }
);

const logout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Çıkış Yapıldı",
    });
  }
);

const getMeProfile = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("Kullanıcı bulunamadı", 401));
    }

    const [patient, doctor] = await Promise.all([
      Patient.findById(userId),
      Doctor.findById(userId),
    ]);

    const currentUser = patient || doctor;

    if (!currentUser) {
      return next(new ErrorHandler("Böyle bir kullanıcı bulunamadı", 404));
    }

    return res.status(200).json({
      success: true,
      user: currentUser,
    });
  }
);

export default {
  login,
  logout,
  getMeProfile,
};
