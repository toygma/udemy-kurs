import { MessageCircle } from "lucide-react";
import RatingSummary from "./_components/RatingSummary";
import RatingDistribution from "./_components/RatingDistribution";
import ReviewForm from "./_components/ReviewForm";
import ReviewList from "./_components/ReviewList";
import { useReviews } from "./hooks/useReviews";

interface ReviewsSectionProps {
  doctorId: string;
}

const ReviewsSection = ({ doctorId }: ReviewsSectionProps) => {
  const {
    reviews,
    isSubmitting,
    isDeleting,
    addReview,
    deleteReview,
    editingId,
    startEditing,
    cancelEditing,
    updateReview,
    editingLoading,
  } = useReviews(doctorId);

  const handleUpdate = (rating: number, comment: string, reviewId?: string) => {
    if (reviewId) {
      updateReview(rating, comment, reviewId);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex gap-3 items-center">
          <MessageCircle className="w-8 h-8 text-indigo-600" />
          Yorumlar
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
        isDeleting={isDeleting}
        editingId={editingId}
        onSubmit={handleUpdate}
        onEdit={startEditing}
        onCancel={cancelEditing}
        isLoading={editingLoading}
      />
    </div>
  );
};

export default ReviewsSection;