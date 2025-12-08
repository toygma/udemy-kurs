export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: {
    public_id?: string;
    url: string;
  };
  isPaid: "paid" | "unpaid";
  role: "admin" | "doctor" | "patient";
}

export interface IAppointment {
  _id: string;
  patient: IUser;
  date: string | Date;
  timeSlot: string;
  status: "cancelled" | "confirmed" | "pending";
  isPaid: "paid" | "unpaid";
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IStats {
  total: number;
  pending: number;
  completed: number;
  cancel: number;
}

export type FilterStatus = "hepsi" | "pending" | "confirmed" | "cancelled";