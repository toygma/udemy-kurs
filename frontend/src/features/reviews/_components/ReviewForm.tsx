import type { ReviewFormProps } from "../types/reviewTypes";

import { Controller, useForm } from "react-hook-form";
import {
  ReviewsSchema,
  type ReviewSchemaType,
} from "../validation/reviews.schema";
import StarRating from "./StarRating";

import { zodResolver } from "@hookform/resolvers/zod";

const ReviewForm = ({ onSubmit, isLoading }: ReviewFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ReviewSchemaType>({
    mode: "onChange",
    resolver: zodResolver(ReviewsSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const commentValue = watch("comment");

  const handleFormSubmit = (data: ReviewSchemaType) => {
    onSubmit(data.rating, data.comment);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Yeni Yorum Ekle</h3>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Puanlama */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Deneyiminizi nasıl değerlendirirsiniz?
            </label>
            <div className="flex items-center gap-4">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRating
                    rating={field.value}
                    onChange={(newRating) => field.onChange(newRating)}
                    size={32}
                  />
                )}
              />
              {watch("rating") > 0 && (
                <span className="text-sm text-gray-600">
                  {
                    ["Kötü", "Orta", "İyi", "Çok İyi", "Mükemmel"][
                      watch("rating") - 1
                    ]
                  }
                </span>
              )}
            </div>
            {errors.rating && (
              <p className="mt-2 text-sm text-red-500">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Yorum */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Görüşünüzü paylaşın (10-500 karakter)
            </label>
            <textarea
              {...register("comment")}
              placeholder="Diğer hastalara doktor hakkında deneyiminizi anlatın..."
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={5}
              maxLength={500}
            />
            <div className="mt-2 text-sm text-gray-500">
              {commentValue?.length || 0}/500 karakter
            </div>
            {errors.comment && (
              <p className="mt-2 text-sm text-red-500">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Gönderme butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto text-sm px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {isLoading ? "Gönderiliyor..." : "Yorumu Gönder"}
          </button>
        </form>
      </h3>
    </div>
  );
};

export default ReviewForm;
