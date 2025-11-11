// components/ReviewList.tsx
import React from "react";
import { MessageCircle } from "lucide-react";
import type { Review } from "../../types/reviewTypes";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  reviews: Review[];
  onDelete: (reviewId: string) => void;
  deletingId: string | null;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onDelete,
  deletingId,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Patient Reviews ({reviews.length})
      </h3>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem
              key={review._id}
              review={review}
              onDelete={onDelete}
              isDeleting={deletingId === review._id}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;