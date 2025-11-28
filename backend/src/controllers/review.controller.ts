import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../middlewares/catch.middleware";
import Review from "../models/review.model";
import ErrorHandler from "../utils/errorHandler";

// GET /reviews
const getAllReviews = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { doctorId } = req.params;

    if (!doctorId) {
      return next(new ErrorHandler("Doktor ID bilgisi gereklidir.", 400));
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

// POST /reviews
const createReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, comment } = req.body;
    const { doctorId } = req.params;

    const userId =req.user?._id;

    if (!userId) {
      return next(
        new ErrorHandler("Yorum yapabilmek için giriş yapmalısınız.", 401)
      );
    }

    if (!doctorId || !rating || !comment) {
      return next(
        new ErrorHandler("Doktor ID, puan ve yorum alanları zorunludur.", 400)
      );
    }

    const existingReview = await Review.findOne({
      patient: userId,
      doctor: doctorId,
    });

    if (existingReview) {
      return next(
        new ErrorHandler("Bu doktor için zaten bir değerlendirme yaptınız.", 409)
      );
    }

    const newReview = await Review.create({
      patient: userId,
      doctor: doctorId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Yorumunuz başarıyla gönderildi.",
      data: newReview,
    });
  }
);

// UPDATE /reviews/:reviewId  <-- YENİ EKLENEN KISIM
const updateReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return next(
        new ErrorHandler("Yorum güncellemek için giriş yapmalısınız.", 401)
      );
    }

    if (!reviewId) {
      return next(new ErrorHandler("Yorum ID bilgisi gereklidir.", 400));
    }

    // Yorumu bul
    const review = await Review.findById(reviewId);
    console.log("🚀 ~ review:", review)

    if (!review) {
      return next(new ErrorHandler("Yorum bulunamadı.", 404));
    }

    // Yorumun sahibi mi kontrol et
    if (review.patient._id.toString() !== userId.toString()) {
      return next(
        new ErrorHandler("Sadece kendi yorumlarınızı güncelleyebilirsiniz.", 403)
      );
    }

    // Alanları güncelle (Eğer kullanıcı yeni değer gönderdiyse)
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    // Kaydet (Bu işlem modeldeki 'save' hook'unu tetikler ve ortalama puanı yeniden hesaplar)
    const updatedReview = await review.save();

    res.status(200).json({
      success: true,
      message: "Yorum başarıyla güncellendi.",
      data: updatedReview,
    });
  }
);

// DELETE /reviews/:reviewId
const deleteReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return next(
        new ErrorHandler("Yorum silmek için giriş yapmalısınız.", 401)
      );
    }

    if (!reviewId) {
      return next(new ErrorHandler("Yorum ID bilgisi gereklidir.", 400));
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return next(new ErrorHandler("Yorum bulunamadı.", 404));
    }

    if (review.patient._id.toString() !== userId.toString()) {
      return next(
        new ErrorHandler("Sadece kendi yorumlarınızı silebilirsiniz.", 403)
      );
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: "Yorum başarıyla silindi.",
    });
  }
);

export default { getAllReviews, createReview, updateReview, deleteReview };