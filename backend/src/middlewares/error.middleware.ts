import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";


interface ValidationError extends Error {
  errors: Record<string, { message: string }>;
}


interface CastError extends Error {
  path: string;
  value: string;
}

interface MongoError extends Error {
  code: number;
  keyValue: Record<string, any>;
}


interface ErrorResponse {
  success: false;
  message: string;
  stack?: string;
  error?: any;
}

const errorMiddleware = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = (err as ErrorHandler).statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const castError = err as CastError;
    message = `Geçersiz ${castError.path}: ${castError.value}`;
    statusCode = 400;
  }

  if (err.name === "ValidationError") {
    const validationError = err as ValidationError;
    message = Object.values(validationError.errors)
      .map((error) => error.message)
      .join(", ");
    statusCode = 400;
  }

  if ((err as MongoError).code === 11000) {
    const mongoError = err as MongoError;
    const field = Object.keys(mongoError.keyValue)[0];
    const value = mongoError.keyValue[field];
    message = `'${value}' değeri ${field} alanında zaten kullanılıyor`;
    statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    message = "Geçersiz token. Lütfen tekrar giriş yapın.";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Token süresi doldu. Lütfen tekrar giriş yapın.";
    statusCode = 401;
  }

  const response: ErrorResponse = {
    success: false,
    message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
    response.error = {
      name:err.name,
      message:err.message,
      path:req.path,
      method:req.method
    }
  }

  res.status(statusCode).json(response);
};

export default errorMiddleware;