import { Star } from "lucide-react";
import type { StarRatingProps } from "../types/review.types";

const StarRating = ({
  rating,
  onChange,
  readOnly = false,
  size = 24,
}: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(star)}
            className="focus:outline-none"
          >
            <Star
              size={size}
              className={`${
                isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
