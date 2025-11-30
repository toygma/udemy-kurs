import mongoose, { Document, Schema, Types } from "mongoose";
import Doctor from "./doctor.model";

export interface IReview extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IReviewModel extends mongoose.Model<IReview> {
  calcAverageRatings(id: Types.ObjectId): Promise<void>;
}

const reviewSchema = new Schema<IReview, IReviewModel>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

//MIDDLEWARE ARA KATMANLAR

reviewSchema.pre(/^find/, function () {
  (this as any).populate({
    path: "patient",
  });

  reviewSchema.statics.calcAverageRatings = async function (
    id: Schema.Types.ObjectId
  ) {
    try {
      const stats = await this.aggregate([
        {
          $match: { doctor: id },
        },
        {
          $group: {
            _id: "$doctor",
            numOfRating: { $sum: 1 },
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      if (stats.length > 0) {
        await Doctor.findByIdAndUpdate(id, {
          totalRating: stats[0].numOfRating,
          averageRating: stats[0].avgRating,
        });
      } else {
        await Doctor.findByIdAndUpdate(id, {
          totalRating: 0,
          averageRating: 0,
        });
      }
    } catch (error) {
      console.log("ortalama puan hesaplanırken bir hata oluştu", error);
    }
  };

  reviewSchema.post("save", async function () {
    await (this.constructor as IReviewModel).calcAverageRatings(this.doctor);

    await Doctor.findByIdAndUpdate(
      this.doctor,
      {
        $addToSet: { reviews: this._id },
      },
      { new: true }
    );
  });

  reviewSchema.post("findOneAndDelete", async function (doc: IReview | null) {
    if (doc) {
      await (doc.constructor as unknown as IReviewModel).calcAverageRatings(
        doc.doctor
      );

      await Doctor.findByIdAndUpdate(
        doc.doctor,
        { $pull: { reviews: doc._id } },
        { new: true }
      );
    }
  });
});

const Review =
  (mongoose.models.Review as IReviewModel) ||
  mongoose.model<IReview, IReviewModel>("Review", reviewSchema);

export default Review;
