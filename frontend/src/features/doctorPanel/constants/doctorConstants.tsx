import { DoctorAvatar3, DoctorAvatar4, DoctorAvatar6 } from "@/core/images";
import type { IAppointment } from "../types/doctorPanelTypes";

export const doctorPanelConstants: IAppointment[] = [
  {
    _id: "apt_001",
    user: {
      _id: "usr_001",
      name: "Dr. Mehmet Karaca",
      email: "mehmetkaraca@example.com",
      phone: "+90 555 111 22 33",
      image: {
        public_id: "img_01",
        url: DoctorAvatar3,
      },

      isPaid: "ödendi",
      role: "doktor",
    },
    date: "2025-01-20",
    timeSlot: "10:00 - 10:30",
    status: "bekleniyor",
    isPaid: "ödenmedi",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-12",
  },
  {
    _id: "apt_002",
    user: {
      _id: "usr_002",
      name: "Ayşe Demir",
      email: "aysedemir@example.com",
      phone: "+90 555 444 33 22",
      image: {
        public_id: "img_02",
        url: DoctorAvatar4,
      },
      isPaid: "ödendi",
      role: "hasta",
    },
    date: "2025-01-18",
    timeSlot: "14:00 - 14:30",
    status: "tamamlandı",
    isPaid: "ödendi",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-18",
  },
  {
    _id: "apt_003",
    user: {
      _id: "usr_003",
      name: "Selim Yalçın",
      email: "selimyalcin@example.com",
      phone: "+90 555 999 88 77",
      image: {
        public_id: "img_03",
        url: DoctorAvatar6,
      },

      isPaid: "ödenmedi",
      role: "hasta",
    },
    date: "2025-01-22",
    timeSlot: "09:30 - 10:00",
    status: "iptal",
    isPaid: "ödenmedi",
    createdAt: "2025-01-11",
    updatedAt: "2025-01-13",
  },
];