import { Response, Request, NextFunction } from "express";
import Doctor, { IDoctor } from "../models/doctor.model";
import Patient, { IPatient } from "../models/patient.model";
import ErrorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: IPatient | IDoctor | any;
    }
  }
}

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Lütfen giriş yapın", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user =
      (await Patient.findById(decoded.id)) ||
      (await Doctor.findById(decoded.id));

    if (!user) {
      return next(new ErrorHandler("Kullanıcı bulunamadı", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorHandler("Geçersiz token", 401));
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role ${req.user?.role} erişim izni yoktur`, 401)
      );
    }
    next();
  };
};
