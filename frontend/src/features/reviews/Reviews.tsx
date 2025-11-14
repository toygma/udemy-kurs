import { MessageCircle } from "lucide-react";
import RatingSummary from "./_components/RatingSummary";
import RatingDistribution from "./_components/RatingDistribution";
import ReviewForm from "./_components/ReviewForm";
import ReviewList from "./_components/ReviewList";
import { useReviews } from "./hooks/useReviews";

const ReviewsSection = () => {
  const { reviews, isSubmitting, deletingId, addReview, deleteReview} =
    useReviews();
  return (
    <div className="min-h-screen  py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          <MessageCircle className="w-8 h-8 text-indigo-600" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RatingSummary reviews={reviews} />
          <RatingDistribution reviews={reviews} />
        </div>
      </div>
      <ReviewForm onSubmit={addReview} isLoading={isSubmitting} />

      <ReviewList
        reviews={reviews}
        onDelete={deleteReview}
        deletingId={deletingId}
      />
    </div>
  );
};

export default ReviewsSection;
