export interface Review {
  _id: string;
  user: {
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

export interface ReviewSectionProps {
  doctorId?: string;
}

export interface RatingSummaryProps {
  reviews: Review[];
}

export interface ReviewFormProps {
  onSubmit: (rating: number, comment: string, reviewId?: string) => void;
  isLoading?: boolean;
}

export interface ReviewItemProps {
  review: Review;
  onDelete?: (reviewId: string) => void;
  isDeleting?: boolean;
  editingId?:string | null;
  onSubmit: (rating:number,comment:string,editingId?:string | null) => void;
  onEdit:(reviewId:string) => void;
  onCancel:()=>void;
  isLoading?:boolean;
}

export interface ReviewListProps {
  reviews: Review[];
  onDelete: (reviewId: string) => void;
  deletingId: string | null;
  editingId?:string | null;
  onSubmit: (rating:number,comment:string) => void;
  onEdit:(reviewId:string) => void;
  onCancel:()=>void;
  isLoading?:boolean;
}
