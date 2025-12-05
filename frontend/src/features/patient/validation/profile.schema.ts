import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.email("Geçersiz email adresi"),
  phone: z.string().min(11, "Telefon numarası en az 11 rakam'dan oluşmalıdır."),
  gender: z.enum(["erkek", "kadın", "seçilmedi"]),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }),
  image: z.string().optional(),
 dateOfBirth: z.string().optional()
});

export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>;
