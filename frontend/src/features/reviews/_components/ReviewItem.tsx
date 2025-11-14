import { formatDate } from "@/shared/utils/helper";
import { Calendar, Edit, Trash2, User } from "lucide-react";
import StarRating from "./StarRating";
import type { ReviewItemProps } from "../types/reviewTypes";
import {
  ReviewsSchema,
  type ReviewSchemaType,
} from "../validation/reviews.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const ReviewItem = ({
  review,
  onDelete,
  isDeleting,
  editingId,
  onSubmit,
  onEdit,
  onCancel,
  isLoading
}: ReviewItemProps) => {
  const isEditing = editingId === review._id;

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
    onSubmit(data.rating, data.comment, editingId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-full bg-indigo-100 
                 flex items-center justify-center shrink-0"
        >
          {review?.user?.image ? (
            <img
              src={review?.user?.image}
              alt={review?.user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-indigo-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {review?.user?.name}
            </h3>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              {/* Tarih */}
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(review?.createdAt)}
              </div>

              {!isEditing && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(review._id)}
                    className="p-2 hover:bg-blue-50 text-blue-600 
                           hover:text-blue-700 rounded-lg transition"
                    title="Edit review"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete?.(review._id)}
                    disabled={isDeleting}
                    className="p-2 hover:bg-red-50 text-red-600 
                           hover:text-red-700 rounded-lg transition 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete review"
                  >
                    {isDeleting ? (
                      <div
                        className="w-5 h-5 border-2 border-red-600 
                                border-t-transparent rounded-full animate-spin"
                      />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-2">
              <StarRating rating={review?.rating} readOnly size={18} />
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {review?.comment}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4 mt-4"
            >
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Puanlama
                </label>
                <div className="flex items-center gap-4">
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        onChange={(newRating) => field.onChange(newRating)}
                        size={24}
                      />
                    )}
                  />
                  {watch("rating") > 0 && (
                    <span className="text-base font-medium text-indigo-600">
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

              {/* Yorum Alanı */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Yorum (10-500 karakter)
                </label>
                <textarea
                  {...register("comment")}
                  placeholder="Diğer hastalara doktor hakkında deneyiminizi anlatın..."
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={5}
                  maxLength={500}
                />
                <div className="mt-2 text-sm text-gray-500 flex justify-between">
                  {errors.comment && (
                    <p className="text-red-500">{errors.comment.message}</p>
                  )}
                  <span className="ml-auto">
                    {commentValue?.length || 0}/500 karakter
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onCancel()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {isLoading ? "Kaydediliyor..." : "Yorumu Güncelle"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
