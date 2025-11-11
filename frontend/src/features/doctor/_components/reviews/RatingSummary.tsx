// components/RatingSummary.tsx
import StarRating from "./StarRating";
import type { Review } from "../../types/reviewTypes";

interface RatingSummaryProps {
  reviews: Review[];
}

const RatingSummary = ({ reviews }:RatingSummaryProps) => {
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center">
        <div className="text-5xl font-bold text-indigo-600 mb-2">
          {averageRating}
        </div>
        <div className="flex justify-center mb-3">
          <StarRating
            rating={Math.round(parseFloat(averageRating))}
            readOnly
          />
        </div>
        <p className="text-gray-600">Based on {reviews.length} reviews</p>
      </div>
    </div>
  );
};

export default RatingSummary;