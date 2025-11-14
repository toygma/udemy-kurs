import { z } from "zod";

export const ReviewsSchema = z.object({
  rating: z.number().min(1, "Lütfen en az 1 yıldız seçin."),
  comment: z
    .string()
    .trim()
    .min(10, "Yorum en az 10 karakter olmalıdır.")
    .max(500, "Yorum 500 karakteri geçemez."),
});

export type ReviewSchemaType = z.infer<typeof ReviewsSchema>;
