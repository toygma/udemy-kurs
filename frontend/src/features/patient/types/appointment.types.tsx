export interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  image:{
    url:string;
  }
  address?: {
    city: string;
    country?: string;
  };
}

export type PaymentStatus = "unpaid" | "paid";


export type AppointmentStatus = "cancelled" | "confirmed" | "pending" ;


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
  onPayment: (appointmentId: string,doctorId:string) => void;
  onCancel: (appointmentId: string) => void;
}