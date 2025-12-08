import { useState } from "react";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
} from "@/store/api/review-api";
import toast from "react-hot-toast";

export const useReviews = (doctorId: string) => {
  const { data: reviews } = useGetAllReviewsQuery(doctorId);

  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const [updateReview, { isLoading: editingLoading }] =
    useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  const addReview = async (rating: number, comment: string) => {
    try {
      await createReview({
        doctorId,
        body: { rating, comment },
      }).unwrap();
      toast.success("Yorum başarılı bir şekilde oluşturuldu");
    } catch (error: any) {
      toast.error(error.message);
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
      toast.success("Yorum başarılı bir şekilde güncellendi");
      setEditingId(null);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Yorum silindi");

    } catch (error: any) {
      toast.error(error.message);
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
    isDeleting,
    editingId,
    addReview,
    updateReview: handleUpdateReview,
    deleteReview: handleDeleteReview,
    startEditing,
    cancelEditing,
    editingLoading,
  };
};
