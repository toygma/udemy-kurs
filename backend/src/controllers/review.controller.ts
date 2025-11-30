import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import ErrorHandler from "../utils/errorHandler";
import Review from "../models/review.model";

const getAllReviews = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { doctorId } = req.params;

    if (!doctorId) {
      return next(new ErrorHandler("Doktor ID bilgisi gereklidir", 400));
    }
    const reviews = await Review.find({ doctor: doctorId })
      .populate([{ path: "patient" }, { path: "doctor" }])
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  }
);

const createReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { doctorId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("Kullanıcı ID bilgisi gereklidir", 401));
    }

    if (!rating || !comment || !doctorId) {
      return next(
        new ErrorHandler("Doktor ID , puan ve yorum alanları zorunludur", 400)
      );
    }

    const existingReview = await Review.findOne({
      patient: userId,
      doctor: doctorId,
    });

    if (existingReview) {
      return next(
        new ErrorHandler(
          "Bu doktor için zaten bir değerlendirme yaptınız.",
          409
        )
      );
    }

    const newReview = await Review.create({
      patient: userId,
      doctor: doctorId,
      rating,
      comment,
    });

    res.status(200).json({
      success: true,
      message: "Yorumunuz başarıyla gönderildi",
      data: newReview,
    });
  }
);

const deleteReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("Kullanıcı ID bilgisi gereklidir", 401));
    }

    if (!reviewId) {
      return next(new ErrorHandler("Yorum ID bilgisi gereklidir", 400));
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return next(new ErrorHandler("Yorum bulunamadı", 404));
    }

    if (review.patient._id.toString() !== userId.toString()) {
      return next(
        new ErrorHandler("Sadece kendi yorumlarınızı silebilirsiniz", 403)
      );
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: "Yorum başarıyla silindi",
    });
  }
);

const updateReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return next(new ErrorHandler("Kullanıcı ID bilgisi gereklidir", 401));
    }

    if (!reviewId) {
      return next(new ErrorHandler("Yorum ID bilgisi gereklidir", 400));
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return next(new ErrorHandler("Yorum bulunamadı", 404));
    }

    if (review.patient._id.toString() !== userId.toString()) {
      return next(
        new ErrorHandler("Sadece kendi yorumunuzu güncelleyebilirsiniz.", 403)
      );
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    const updateReview = await review.save();

    res.status(200).json({
      success: true,
      message: "Yorum başarıyla güncellendi",
      data: updateReview,
    });
  }
);

export default {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
};
