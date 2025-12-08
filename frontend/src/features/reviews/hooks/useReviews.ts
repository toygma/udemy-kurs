import { useState } from "react";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
} from "@/store/api/review-api";
import toast from "react-hot-toast";


export const useReviews = (doctorId: string) => {
  const { data: reviews = [] } = useGetAllReviewsQuery(doctorId);

  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const [updateReview, { isLoading: editingLoading }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  const addReview = async (rating: number, comment: string) => {
    try {
      await createReview({
        doctorId,
        body: { rating, comment },
      }).unwrap();
      toast.success("Yorum başarıyla eklendi");
    } catch (error: any) {
      toast.error(error?.data?.message || "Bir hata oluştu");
    }
  };

  const handleUpdateReview = async (
    rating: number,
    comment: string,
    reviewId: string
  ) => {
    try {
      await updateReview({
        reviewId,
        body: { rating, comment },
      }).unwrap();
      toast.success("Yorum güncellendi");
      setEditingId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Bir hata oluştu");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm("Yorumun silinecek emin misin?")) {
      try {
        await deleteReview(reviewId).unwrap();
        toast.success("Yorum silindi");
      } catch (error: any) {
        toast.error(error?.data?.message || "Bir hata oluştu");
      }
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
    editingId,
    editingLoading,
    isDeleting,
    addReview,
    updateReview: handleUpdateReview,
    deleteReview: handleDeleteReview,
    startEditing,
    cancelEditing,
  };
};