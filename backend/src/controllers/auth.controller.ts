import { Request, Response, NextFunction } from "express";
import Patient from "../models/patient.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catch.middleware";

// Register Patient
const registerPatient = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Boş alanlarını doldurunuz", 400));
    }

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return next(new ErrorHandler("Bu email zaten kullanılıyor", 400));
    }

    // Hasta oluştur
    const patient = await Patient.create({
      name,
      email,
      password,
    });

    return res.status(201).json(patient)
  }
);



export default {
    registerPatient,
}