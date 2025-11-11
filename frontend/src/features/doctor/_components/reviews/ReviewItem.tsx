// components/ReviewItem.tsx
import React from "react";
import { User, Calendar, Trash2 } from "lucide-react";
import StarRating from "./StarRating";
import type { Review } from "../../types/reviewTypes";

interface ReviewItemProps {
  review: Review;
  onDelete: (reviewId: string) => void;
  isDeleting?: boolean;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onDelete,
  isDeleting,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          {review.user.image ? (
            <img
              src={review.user.image}
              alt={review.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-indigo-600" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(review.createdAt)}
              </div>
              <button
                onClick={() => onDelete(review._id)}
                disabled={isDeleting}
                className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete review"
              >
                {isDeleting ? (
                  <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <StarRating rating={review.rating} readOnly size={18} />
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;