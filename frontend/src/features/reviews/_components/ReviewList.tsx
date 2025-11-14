import { MessageCircle } from "lucide-react";
import type { ReviewListProps } from "../types/reviewTypes";
import ReviewItem from "./ReviewItem";

const ReviewList = ({
  reviews,
  onDelete,
  deletingId,
  editingId,
  onSubmit,
  onEdit,
  onCancel,
}: ReviewListProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Yorum Sayısı ({reviews.length})
      </h3>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem
              key={review._id}
              review={review}
              onDelete={onDelete}
              isDeleting={deletingId === review._id}
              editingId={editingId} 
              onSubmit={onSubmit} 
              onEdit={onEdit} 
              onCancel={onCancel} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Henüz bir yorum yok.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
