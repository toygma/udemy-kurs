import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Patient from "../models/patient.model";
import sendToken from "../utils/sendToken";

const registerPatient = catchAsyncError(
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

export default {
  registerPatient,
};
