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
    status: "tamamlandı",
  },
  {
    _id: "a2",
    doctor: { name: "Dr. Mehmet Korkmaz" },
    user: { name: "Merve Ay" },
    date: "2025-02-12T15:00:00",
    timeSlot: "15:00 - 15:30",
    status: "bekleniyor",
  },
  {
    _id: "a3",
    doctor: { name: "Dr. Selin Akar" },
    user: { name: "Ceren Öz" },
    date: "2025-02-11T11:00:00",
    timeSlot: "11:00 - 11:30",
    status: "tamamlandı",
  },
  {
    _id: "a4",
    doctor: { name: "Dr. Murat Demir" },
    user: { name: "Ahmet Yılmaz" },
    date: "2025-02-14T09:30:00",
    timeSlot: "09:30 - 10:00",
    status: "bekleniyor",
  },
  {
    _id: "a5",
    doctor: { name: "Dr. Murat Demir" },
    user: { name: "Ahmet Yılmaz" },
    date: "2025-02-14T09:30:00",
    timeSlot: "09:30 - 10:00",
    status: "iptal",
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
