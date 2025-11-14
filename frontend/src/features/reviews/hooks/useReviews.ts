import { useState } from "react";
import type { Review } from "../types/reviewTypes";

export const useReviews = (initialReviews: Review[] = []) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const addReview = async (rating: number, comment: string) => {
    setIsSubmitting(true);

    setTimeout(() => {
      const newReview: Review = {
        _id: crypto.randomUUID(),
        user: {
          name: "New User",
          image: "",
        },
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      setIsSubmitting(false);
    }, 1000);
  };

  const updateReview = async (
    reviewId: string,
    rating: number,
    comment: string
  ) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId ? { ...review, rating, comment } : review
        )
      );

      setIsSubmitting(false);
      setEditingId(null);
    }, 1000);
  };

  const deleteReview = (reviewId: string) => {
    if (window.confirm("Yorumun silinecek emin misin ? ")) {
      setDeletingId(reviewId);

      setTimeout(() => {
        setReviews((prev) => prev.filter((review) => review._id !== reviewId));

        setDeletingId(null);
      }, 1000);
    }
  };

  const startEditing = (reviewId: string) => {
    setEditingId(reviewId);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return {
    reviews,
    isSubmitting,
    deletingId,
    editingId,
    addReview,
    updateReview,
    deleteReview,
    startEditing,
    cancelEditing,
  };
};
