import z from "zod"

export const PatientSchema = z.object({
name:z.string().min(2,"İsim en az 2 karakterden oluşmalıdır."),
email:z.email("Lütfen geçerli bir e-posta adresi giriniz."),
password:z.string().min(6,"Şifre en az 6 karakterden oluşmalıdır."),
role:z.literal("patient")
})

export type TPatientSignupSchema = z.infer<typeof PatientSchema>