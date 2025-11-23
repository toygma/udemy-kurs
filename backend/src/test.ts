import { NextFunction, Request, Response } from "express";
import ErrorHandler from "./utils/errorHandler";
import catchAsyncError from "./middlewares/catch.middleware";

const RegisterUser = catchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
 const { email, password } = req.body;

    if (!email || !password) {
        throw new ErrorHandler("E-posta ve şifre zorunludur.", 400);
    }


    if (email === "test@error.com") {
        throw new ErrorHandler("Bu e-posta zaten kullanımda.", 409); 
    }

    res.status(201).json({
        success: true,
        message: "Kullanıcı başarıyla kaydedildi.",
        user: { email, id: Date.now() },
    });
});
export default RegisterUser
