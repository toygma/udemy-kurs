import {
  User,
  Heart,
  Activity,
  Baby,
  Brain,
  Bone,
  Eye,
  MessageCircle,
  Dna,
  Coffee,
  Smile,
} from "lucide-react";
import type { Doctor } from "../types/doctorTypes";
import { DoctorAvatar2, DoctorAvatar3 } from "@/core/images";

export const categories = [
  { id: "all", name: "Tüm Doktorlar", icon: <User /> },
  { id: "cardiologist", name: "Kardiyolog", icon: <Heart /> },
  { id: "dermatologist", name: "Dermatolog", icon: <Activity /> },
  { id: "pediatrician", name: "Pediatrist", icon: <Baby /> },
  { id: "neurologist", name: "Nörolog", icon: <Brain /> },
  { id: "orthopedic_surgeon", name: "Ortopedik Cerrah", icon: <Bone /> },
  { id: "ophthalmologist", name: "Göz Doktoru", icon: <Eye /> },
  { id: "psychiatrist", name: "Psikiyatrist", icon: <MessageCircle /> },
  { id: "endocrinologist", name: "Endokrinolog", icon: <Dna /> },
  { id: "gastroenterologist", name: "Gastroenterolog", icon: <Coffee /> },
  { id: "dentist", name: "Diş Doktoru", icon: <Smile /> },
];


export const doctors: Doctor[] = [
  {
    _id: "1",
    name: "Dr. Elif Demir",
    email: "elif.demir@hospital.com",
    phone: "+90 555 123 4567",
    role: "doctor",
    speciality: "Cardiologist",
    specialityKey: "cardiology",
    experience: 12,
    fee: 150,
    patients: 850,
    available: true,
    averageRating: 4.9,
    totalRating: 4.9,
    about:
      "Dr. Elif Demir is a leading cardiologist with over 12 years of experience in diagnosing and treating heart diseases. She focuses on preventive cardiology and lifestyle-based interventions.",
    appointmentDurationMinutes: 30,
    address: {
      street: "Bağdat Caddesi No:120",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
      country: "Türkiye",
    },
    appointments: [],
    reviews: [],
    awards: [
      {
        title: "Best Cardiologist",
        year: 2023,
        organization: "Turkish Medical Association",
      },
      {
        title: "Heart Health Innovator Award",
        year: 2021,
        organization: "Istanbul Medical Society",
      },
    ],
    education: [
      {
        degree: "MD, Cardiology",
        university: "Hacettepe University Faculty of Medicine",
        year: 2012,
      },
      {
        degree: "PhD, Cardiovascular Research",
        university: "Istanbul University",
        year: 2017,
      },
    ],
    services: [
      "Cardiac Check-up",
      "Electrocardiogram (ECG)",
      "Echocardiography",
      "Blood Pressure Monitoring",
      "Heart Disease Prevention Counseling",
    ],
    workingHours: [
      { day: "Pazartesi", startTime: "09:00", endTime: "17:00" },
      { day: "Salı", startTime: "09:00", endTime: "17:00" },
      { day: "Çarşamba", startTime: "09:00", endTime: "17:00" },
      { day: "Perşembe", startTime: "09:00", endTime: "17:00" },
      { day: "Cuma", startTime: "09:00", endTime: "16:00" },
    ],
    images: [
      {
        url: DoctorAvatar2,
      },
    ],
    createdAt: "2023-09-15T10:00:00Z",
    updatedAt: "2024-02-01T12:00:00Z",
  },
  {
    _id: "2",
    name: "Dr. Mehmet Kaya",
    email: "mehmet.kaya@hospital.com",
    phone: "+90 555 987 6543",
    role: "doctor",
    speciality: "Dermatologist",
    specialityKey: "dermatology",
    experience: 8,
    fee: 120,
    patients: 640,
    available: false,
    averageRating: 4.7,
    totalRating: 4.7,
    about:
      "Dr. Mehmet Kaya is a board-certified dermatologist specializing in skin treatments, cosmetic dermatology, and laser therapies.",
    appointmentDurationMinutes: 25,
    address: {
      street: "Atatürk Bulvarı No:45",
      city: "Ankara",
      district: "Çankaya",
      postalCode: "06690",
      country: "Türkiye",
    },
    appointments: [],
    reviews: [],
    awards: [
      {
        title: "Skin Care Specialist Award",
        year: 2022,
        organization: "Turkish Dermatology Association",
      },
    ],
    education: [
      {
        degree: "MD, Dermatology",
        university: "Ankara University Faculty of Medicine",
        year: 2015,
      },
    ],
    services: [
      "Acne Treatment",
      "Laser Hair Removal",
      "Skin Rejuvenation",
      "Mole Examination",
      "Botox & Fillers",
    ],
    workingHours: [
      { day: "Pazartesi", startTime: "09:00", endTime: "17:00" },
      { day: "Salı", startTime: "09:00", endTime: "17:00" },
      { day: "Çarşamba", startTime: "09:00", endTime: "17:00" },
      { day: "Cuma", startTime: "09:00", endTime: "16:00" },
    ],
    images: [
      {
        url: DoctorAvatar3,
      },
    ],
    createdAt: "2023-08-10T09:30:00Z",
    updatedAt: "2024-01-22T14:15:00Z",
  },
];
