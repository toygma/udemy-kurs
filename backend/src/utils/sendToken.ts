import { Response } from "express";
import { IPatient } from "../models/patient.model";
import { IDoctor } from "../models/doctor.model";

interface SendTokenOptions {
  user: IPatient | IDoctor;
  statusCode: number;
  res: Response;
}

const sendToken = (options: SendTokenOptions) => {
  const { user, statusCode, res } = options;

  const jwtToken = user.getJwtToken;

  const cookieExpiresTime = parseInt(process.env.COOKIE_EXPIRES_TIME!, 10);

  const cookieExpires = new Date(
    Date.now() + cookieExpiresTime * 24 * 60 * 60 * 1000
  );

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: cookieExpires,
    path: "/",
  });

  res.status(statusCode).json({
    success: true,
    token: jwtToken,
    user,
  });
};

export default sendToken;
