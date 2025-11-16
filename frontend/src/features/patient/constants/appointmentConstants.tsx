import type { Appointment } from "../types/appointmentTypes";

export const mockAppointments: Appointment[] = [
  {
    _id: "apt_001",
    doctor: {
      _id: "doc_001",
      name: "Dr. Ayşe Yılmaz",
      speciality: "Kardiyolog",
      images: [
        {
          url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
        },
      ],
      address: {
        city: "İstanbul",
        country: "Türkiye",
      },
    },
    date: "2024-12-20T10:00:00.000Z",
    timeSlot: "10:00 - 10:30",
    status: "tamamlandı",
    reason: "Rutin kontrol",
    isPaid: "ödenmedi",
  },
  {
    _id: "apt_002",
    doctor: {
      _id: "doc_002",
      name: "Dr. Mehmet Demir",
      speciality: "Dermatolog",
      images: [
        {
          url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
        },
      ],
      address: {
        city: "Ankara",
        country: "Türkiye",
      },
    },
    date: "2024-12-22T14:00:00.000Z",
    timeSlot: "14:00 - 14:30",
    status: "bekleniyor",
    isPaid: "ödenmedi",
    paymentId: "pay_123456",
  },
  {
    _id: "apt_003",
    doctor: {
      _id: "doc_003",
      name: "Dr. Zeynep Kaya",
      speciality: "Çocuk Doktoru",
      images: [
        {
          url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
        },
      ],
      address: {
        city: "İzmir",
        country: "Türkiye",
      },
    },
    date: "2024-12-25T09:30:00.000Z",
    timeSlot: "09:30 - 10:00",
    status: "iptal",
    reason: "Çocuk aşısı",
    isPaid: "ödenmedi",
  },
  {
    _id: "apt_004",
    doctor: {
      _id: "doc_004",
      name: "Dr. Can Öztürk",
      speciality: "Ortopedi Uzmanı",
      images: [
        {
          url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
        },
      ],
      address: {
        city: "Bursa",
        country: "Türkiye",
      },
    },
    date: "2024-12-18T11:00:00.000Z",
    timeSlot: "11:00 - 11:30",
    status: "tamamlandı",
    isPaid: "ödendi",
    paymentId: "pay_789012",
  },
  {
    _id: "apt_005",
    doctor: {
      _id: "doc_005",
      name: "Dr. Elif Şahin",
      speciality: "Göz Hastalıkları Uzmanı",
      images: [
        {
          url: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400",
        },
      ],
      address: {
        city: "Antalya",
        country: "Türkiye",
      },
    },
    date: "2024-12-15T15:30:00.000Z",
    timeSlot: "15:30 - 16:00",
    status: "bekleniyor",
    isPaid: "ödenmedi",
  },
];