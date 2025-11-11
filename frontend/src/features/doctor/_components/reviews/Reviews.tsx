import { useState } from "react";
import { MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { Review } from "../../types/reviewTypes";
import RatingSummary from "./RatingSummary";
import RatingDistribution from "./RatingDistribution";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import Modal from "@/shared/ui/Modal";

const initialReviews: Review[] = [
  {
    _id: "1",
    user: {
      name: "Ahmet Yılmaz",
      image: "",
    },
    rating: 5,
    comment:
      "Harika bir doktor. Çok ilgili ve profesyonel. Kesinlikle tavsiye ederim.",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    user: {
      name: "Ayşe Kaya",
      image: "",
    },
    rating: 4,
    comment:
      "İyi bir deneyimdi. Sadece randevu saatleri biraz daha esnek olabilir.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmitReview = async (rating: number, comment: string) => {
    setIsSubmitting(true);

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      const newReview: Review = {
        _id: crypto.randomUUID(),
        user: {
          name: "Yeni Kullanıcı",
          image: "",
        },
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      toast.success("Review created successfully!");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDeleteReview = (reviewId: string) => {
    setDeletingId(reviewId);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    if (deletingId) {
      setTimeout(() => {
        setReviews((prev) => prev.filter((r) => r._id !== deletingId));
        toast.success("Review deleted successfully!");
        setDeletingId(null);
        setModalOpen(false);
        setIsDeleting(false);
      }, 1000);
    }
  };

  const handleCancelDelete = () => {
    setDeletingId(null);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen  py-12 mt-12">
      <div>
        {/* Reviews Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-indigo-600" />
            Patient Reviews
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
