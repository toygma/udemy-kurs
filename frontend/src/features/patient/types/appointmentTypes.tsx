export interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  images?: { url: string }[];
  address?: {
    city: string;
    country?: string;
  };
}

export type PaymentStatus = "ödenmedi" | "ödendi";


export type AppointmentStatus = "bekleniyor" | "tamamlandı" | "iptal" ;


export interface Appointment {
  _id: string;
  doctor: Doctor;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  reason?: string;
  isPaid: PaymentStatus;
  paymentId?: string;
}


export interface AppointmentCardProps {
  appointment: Appointment;
  onPayment: (appointmentId: string) => void;
  onCancel: (appointmentId: string) => void;
}