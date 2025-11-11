import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;        // Mevcut puan
  onChange?: (rating: number) => void;  // Puan değişince çağrılacak
  readOnly?: boolean;    // Sadece gösterim mi, yoksa tıklanabilir mi?
  size?: number;         // Yıldız boyutu
}

const StarRating = ({ rating, onChange, readOnly = false, size = 24 }:StarRatingProps) => {
  // "5 yıldız için map yapıyoruz..."
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readOnly && onChange?.(star)}
          disabled={readOnly}
          type="button"
        >
          <Star
            size={size}
            className={star <= rating ? "fill-yellow-400" : "text-gray-300"}
          />
        </button>
      ))}
    </div>
  );
};
export default StarRating