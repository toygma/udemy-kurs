import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Patient from "../models/patient.model";
import sendToken from "../utils/sendToken";
import { upload_file } from "../utils/cloudinary";

const register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Boş alanları doldurunuz", 400));
    }

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return next(new ErrorHandler("Bu email zaten kullanılıyor", 400));
    }

    const patient = await Patient.create({
      name,
      email,
      password,
    });

    sendToken({
      user: patient,
      statusCode: 201,
      res,
    });
  }
);

const updateMyProfile = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, address, gender, phone, dateOfBirth, image } =
      req.body;

    if (email) {
      const existingUser = await Patient.findOne({ email });
      if (
        existingUser &&
        existingUser._id.toString() !== req.user._id.toString()
      ) {
        return next(new ErrorHandler("Bu email zaten kullanılıyor.", 400));
      }
    }

    let uploadedImage: { public_id: string; url: string } | undefined;

    if (image) {
      const folder = "udemy-kurs";
      const uploaded = await upload_file(image, folder);
      uploadedImage = { public_id: uploaded.public_id, url: uploaded.url };
    }

    const newUserData = {
      name,
      email,
      address,
      gender,
      phone,
      dateOfBirth,
      image: uploadedImage,
    };
    const user = await Patient.findByIdAndUpdate(req.user?._id, newUserData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export default {
  register,
  updateMyProfile,
};
