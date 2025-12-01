import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Lütfen geçerli bir e-posta adresi giriniz."),
  password: z.string().min(6, "Şifre en az 6 karakterden oluşmalıdır."),
  role:z.literal("patient")
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;