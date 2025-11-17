export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: {
    public_id?: string;
    url: string;
  };
  isPaid: "ödendi" | "ödenmedi";
  role: "admin" | "doktor" | "hasta";
}

export interface IAppointment {
  _id: string;
  user: IUser;
  date: string | Date;
  timeSlot: string;
  status: "bekleniyor" | "tamamlandı" | "iptal";
  isPaid: "ödendi" | "ödenmedi";
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
}

export type FilterStatus = "hepsi" | "bekleniyor" | "tamamlandı" | "iptal";
