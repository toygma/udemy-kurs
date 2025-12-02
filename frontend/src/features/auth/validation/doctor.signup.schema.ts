import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(3, "Sokak en az 3 karakter olmalı"),
  city: z.string().min(2, "Şehir en az 2 karakter olmalı"),
  postalCode: z.string().min(5, "Posta kodu en az 5 karakter olmalı"),
  country: z.string().min(2, "Ülke en az 2 karakter olmalı"),
});

const awardSchema = z.object({
  title: z.string().min(3, "Ödül başlığı en az 3 karakter olmalı"),
  year: z
    .number({ error: "Boş bırakılamaz" })
    .min(1950, "Geçerli yıl girin")
    .max(2025, "Geçerli yıl girin"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
  organization: z.string().min(3, "Organizasyon adı en az 3 karakter olmalı"),
});

const timeSlotSchema = z
  .object({
    start: z.string(),
    end: z.string(),
  })
  .refine(
    (data) => {
      const [startHour, startMin] = data.start.split(":").map(Number);
      const [endHour, endMin] = data.end.split(":").map(Number);
      const startTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;
      return endTime > startTime;
    },
    {
      message: "Bitiş saati başlangıç saatinden sonra olmalı",
      path: ["end"],
    }
  );

const workingHoursSchema = z
  .object({
    day: z.enum([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]),
    isWorking: z.boolean(),
    slots: z.array(timeSlotSchema).min(0),
  })
  .refine(
    (data) => {
      if (data.isWorking && data.slots.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: "Müsait günler için en az bir zaman dilimi eklenmelidir",
      path: ["slots"],
    }
  );

export const SignupDoctorFormSchema = z.object({
  name: z
    .string({ error: "Boş bırakılamaz" })
    .min(3, "İsim en az 3 karakter olmalı")
    .max(100, "İsim en fazla 100 karakter olabilir"),

  email: z.email("Geçerli bir email adresi giriniz").toLowerCase(),

  password: z
    .string({ error: "Boş bırakılamaz" })
    .min(8, "Şifre en az 8 karakter olmalı")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"
    )
    .optional(),

  image: z.string().optional(),

  speciality: z.string({ error: "Boş bırakılamaz" }),

  available: z.boolean(),

  role: z.literal("doctor"),

  experience: z
    .number({ error: "Boş bırakılamaz" })
    .min(0, "Deneyim 0'dan küçük olamaz")
    .max(70, "Deneyim 70 yıldan fazla olamaz"),

  about: z
    .string({ error: "Boş bırakılamaz" })
    .min(50, "Hakkında bölümü en az 50 karakter olmalı")
    .max(1000, "Hakkında bölümü en fazla 1000 karakter olabilir"),

  education: z
    .array(
      z.object({
        degree: z.string({ error: "Boş bırakılamaz" }).min(1, "Derece gerekli"),
        institution: z
          .string({ error: "Boş bırakılamaz" })
          .min(1, "Kurum gerekli"),
        year: z
          .number({ error: "Boş bırakılamaz" })
          .min(1950, "Geçerli yıl girin")
          .max(2025, "Geçerli yıl girin"),
      })
    )
    .optional(),

  services: z.string({ error: "Boş bırakılamaz" }).min(1),

  address: addressSchema,

  phone: z
    .string({ error: "Boş bırakılamaz" })
    .regex(
      /^(\+90|0)?[0-9]{10}$/,
      "Geçerli bir telefon numarası giriniz (örn: +905551234567)"
    ),

  fee: z
    .number({ error: "Boş bırakılamaz" })
    .min(0, "Ücret 0'dan küçük olamaz")
    .max(100000, "Ücret çok yüksek"),

  patients: z
    .number({ error: "Boş bırakılamaz" })
    .min(0, "Hasta sayısı 0'dan küçük olamaz")
    .optional(),

  awards: z.array(awardSchema).optional(),

  workingHours: z.array(workingHoursSchema),
});

export type TDoctorSignupFormSchema = z.infer<typeof SignupDoctorFormSchema>;
