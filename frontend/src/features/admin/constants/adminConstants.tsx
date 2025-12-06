import type { DoctorRequest, User } from "../types/admin.types";

export const stats = {
  totalDoctors: 12,
  totalPatients: 340,
  totalComments: 89,
  totalAppointments: 152,
};

export const appointmentsByDoctor = [
  {
    id: "d1",
    name: "Dr. Ayşe Yılmaz",
    speciality: "Dahiliye",
    count: 28,
  },
  {
    id: "d2",
    name: "Dr. Mehmet Korkmaz",
    speciality: "Kardiyoloji",
    count: 16,
  },
  {
    id: "d3",
    name: "Dr. Selin Akar",
    speciality: "Dermatoloji",
    count: 22,
  },
  {
    id: "d4",
    name: "Dr. Murat Demir",
    speciality: "Ortopedi",
    count: 13,
  },
];

export const newAppointments = [
  {
    _id: "apt101",
    user: { name: "Ali Koç" },
    doctor: { name: "Dr. Ayşe Yılmaz" },
    date: "2025-02-13T10:00:00",
    timeSlot: "10:00 - 10:30",
  },
  {
    _id: "apt102",
    user: { name: "Ceren Öz" },
    doctor: { name: "Dr. Selin Akar" },
    date: "2025-02-13T14:00:00",
    timeSlot: "14:00 - 14:30",
  },
  {
    _id: "apt103",
    user: { name: "Ahmet Yılmaz" },
    doctor: { name: "Dr. Murat Demir" },
    date: "2025-02-14T09:30:00",
    timeSlot: "09:30 - 10:00",
  },
];

export const appointmentList = [
  {
    _id: "a1",
    doctor: { name: "Dr. Ayşe Yılmaz" },
    user: { name: "Ali Koç" },
    date: "2025-02-13T10:00:00",
    timeSlot: "10:00 - 10:30",
    status: "confirmed",
  },
  {
    _id: "a2",
    doctor: { name: "Dr. Mehmet Korkmaz" },
    user: { name: "Merve Ay" },
    date: "2025-02-12T15:00:00",
    timeSlot: "15:00 - 15:30",
    status: "pending",
  },
  {
    _id: "a3",
    doctor: { name: "Dr. Selin Akar" },
    user: { name: "Ceren Öz" },
    date: "2025-02-11T11:00:00",
    timeSlot: "11:00 - 11:30",
    status: "confirmed",
  },
  {
    _id: "a4",
    doctor: { name: "Dr. Murat Demir" },
    user: { name: "Ahmet Yılmaz" },
    date: "2025-02-14T09:30:00",
    timeSlot: "09:30 - 10:00",
    status: "pending",
  },
  {
    _id: "a5",
    doctor: { name: "Dr. Murat Demir" },
    user: { name: "Ahmet Yılmaz" },
    date: "2025-02-14T09:30:00",
    timeSlot: "09:30 - 10:00",
    status: "rejected",
  },
];

export const doctorServices = [
  "Genel Muayene",
  "Aşılama",
  "Kan Tahlili",
  "EKG (Elektrokardiyogram)",
  "Ultrason",
  "Fizik Tedavi",
  "Diyet ve Beslenme Danışmanlığı",
  "Psikolojik Danışmanlık",
  "Cilt Tedavisi",
  "Reçete / İlaç Yönetimi",
];

export const MOCK_DOCTOR_REQUESTS: DoctorRequest[] = [
  {
    id: 1,
    fullName: "Dr. Ahmet Yılmaz",
    specialization: "Kardiyoloji",
    email: "ahmet.yilmaz@ornek.com",
    phone: "0555 111 22 33",
    requestDate: "2023-10-25",
    status: "pending",
  },
  {
    id: 2,
    fullName: "Dr. Ayşe Kaya",
    specialization: "Dahiliye",
    email: "ayse.kaya@ornek.com",
    phone: "0555 444 55 66",
    requestDate: "2023-10-26",
    status: "approved",
  },
  {
    id: 3,
    fullName: "Dr. Mehmet Demir",
    specialization: "Nöroloji",
    email: "mehmet.demir@ornek.com",
    phone: "0555 777 88 99",
    requestDate: "2023-10-27",
    status: "rejected",
  },
];

export const MOCK_USERS: User[] = [
  {
    id: 1,
    fullName: "Burak Admin",
    email: "burak@admin.com",
    role: "admin",
    isBlocked: false,
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    fullName: "Dr. Ayşe Yılmaz",
    email: "ayse@hastane.com",
    role: "doctor",
    isBlocked: false,
    createdAt: "2023-05-15",
  },
  {
    id: 3,
    fullName: "Mehmet Hasta",
    email: "mehmet@gmail.com",
    role: "patient",
    isBlocked: false,
    createdAt: "2023-08-20",
  },
  {
    id: 4,
    fullName: "Kötü Niyetli Kullanıcı",
    email: "spam@bot.com",
    role: "patient",
    isBlocked: true,
    createdAt: "2023-11-02",
  },
];

export const specialistData = [
  { id: 1, name: "Kardiyolog" },
  { id: 2, name: "Dermatolog" },
  { id: 3, name: "Pediatrist" },
  { id: 4, name: "Nörolog" },
  { id: 5, name: "Ortopedik Cerrah" },
  { id: 6, name: "Göz Doktoru" },
  { id: 7, name: "Psikiyatrist" },
  { id: 8, name: "Endokrinolog" },
  { id: 9, name: "Gastroenterolog" },
  { id: 10, name: "Diş Hekimi" },
];
