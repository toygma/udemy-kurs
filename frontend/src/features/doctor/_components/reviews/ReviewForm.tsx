// components/ReviewForm.tsx
import React, { useState } from "react";
import StarRating from "./StarRating";
import toast from "react-hot-toast";

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  isLoading?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isLoading }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }

    onSubmit(rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Share Your Experience
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            How would you rate your experience?
          </label>
          <div className="flex items-center gap-4">
            <StarRating rating={rating} onChange={setRating} size={32} />
            {rating > 0 && (
              <span className="text-sm text-gray-600">
                {["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1]}
              </span>
            )}
          </div>
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Share your feedback (at least 10 characters)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell other patients about your experience with this doctor..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={5}
            maxLength={500}
          />
          <div className="mt-2 text-sm text-gray-500">
            {comment.length}/500 characters
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;