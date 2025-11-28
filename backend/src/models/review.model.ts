import mongoose, { Schema, Document, Types, Query } from "mongoose";
import Doctor from "./doctor.model";

// Review dökümanı için TypeScript arayüzü
export interface IReview extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Statik metodları içeren Model arayüzü
interface IReviewModel extends mongoose.Model<IReview> {
  calcAverageRatings(id: Types.ObjectId): Promise<void>;
}

const reviewSchema = new Schema<IReview, IReviewModel>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient", // Hasta modeli referansı
      required: [true, "Hasta bilgisi zorunludur."],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor", // Doktor modeli referansı
      required: [true, "Doktor bilgisi zorunludur."],
    },
    rating: {
      type: Number,
      required: [true, "Puanlama zorunludur."],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Yorum alanı zorunludur."],
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik oluşur
  }
);

// ------------------------------------------------------------------
// MIDDLEWARE (ARA KATMANLAR)
// ------------------------------------------------------------------

// 1. "Bulma" (Find) işlemlerinden önce çalışır.
// Amacı: Yorumlar çekildiğinde, yorumu yapan hastanın adını ve resmini otomatik getirmektir.
reviewSchema.pre(/^find/, function () {
  (this as any).populate({
    path: "patient",
  });
});
// 2. Statik Metot: Ortalama Puan Hesaplama
// Amacı: Bir doktora ait tüm yorumları alıp ortalama puanı hesaplar ve Doktor modeline kaydeder.
reviewSchema.statics.calcAverageRatings = async function (id: Types.ObjectId) {
  try {
    // MongoDB Aggregation Pipeline (Toplama İşlemi)
    const stats = await this.aggregate([
      {
        $match: { doctor: id }, // 1. Aşama: Sadece bu doktorun yorumlarını filtrele
      },
      {
        $group: {
          _id: "$doctor", // Doktor ID'sine göre grupla
          numOfRating: { $sum: 1 }, // Toplam yorum sayısını bul (+1 ekleyerek)
          avgRating: { $avg: "$rating" }, // Puanların ortalamasını al
        },
      },
    ]);

    // İstatistik verisi varsa doktoru güncelle
    if (stats.length > 0) {
      await Doctor.findByIdAndUpdate(id, {
        totalRating: stats[0].numOfRating,
        averageRating: stats[0].avgRating,
      });
    } else {
      // Eğer hiç yorum kalmadıysa (hepsi silindiyse) puanları sıfırla
      await Doctor.findByIdAndUpdate(id, {
        totalRating: 0,
        averageRating: 0,
      });
    }
  } catch (error) {
    console.error("Ortalama puan hesaplanırken hata oluştu:", error);
  }
};

// 3. Kayıt (Save) işleminden sonra çalışır.
// Amacı: Yeni bir yorum eklendiğinde ortalamayı yeniden hesaplamak ve doktorun yorum listesine eklemek.
reviewSchema.post("save", async function () {
  // 'this' burada kaydedilen yorum dökümanıdır.
  // Ortalamayı güncelle
  await (this.constructor as IReviewModel).calcAverageRatings(this.doctor);

  // Doktorun 'reviews' dizisine bu yorumun ID'sini ekle ($push)
  await Doctor.findByIdAndUpdate(
    this.doctor,
    { $addToSet: { reviews: this._id } },
    { new: true }
  );
});

// 4. Silme (findOneAndDelete) işleminden sonra çalışır.
// Amacı: Yorum silindiğinde ortalamayı yeniden hesaplamak ve doktorun listesinden düşmek.
// Not: `findOneAndDelete` bir sorgu middleware'idir, ancak post hook'ta silinen döküman (doc) parametre olarak gelir.
reviewSchema.post("findOneAndDelete", async function (doc: IReview | null) {
  if (doc) {
    // Silinen yorumun doktoru için ortalamayı tekrar hesapla
    // `this.model` sorgunun yapıldığı modele (Review) erişir.
    await (doc.constructor as unknown as IReviewModel).calcAverageRatings(
      doc.doctor
    );

    // Doktorun 'reviews' dizisinden bu yorumun ID'sini çıkar ($pull)
    await Doctor.findByIdAndUpdate(
      doc.doctor,
      { $pull: { reviews: doc._id } },
      { new: true }
    );
  }
});

const Review =
  (mongoose.models.Review as IReviewModel) ||
  mongoose.model<IReview, IReviewModel>("Review", reviewSchema);

export default Review;
