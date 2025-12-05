export interface IEducation {
  degree: string;
  university: string;
  year: string;
}

export interface IImage {
  public_id: string;
  url: string;
}

export interface IWorkingHours {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export interface IAddress {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface IAwards {
  title: string;
  year: string;
  organization: string;
}

export interface IAppointment {
  date: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled";
  isPaid: "unpaid" | "paid";
  paymentId?: string;
  session?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviews {
  rating: number;
  comment: string;
  createdAt: Date;
}

export type RoleValue = "patient" | "doctor" | "admin";

export interface IDoctor {
  _id: string;
  appointments: IAppointment[];
  reviews: IReviews[];
  name: string;
  email: string;
  password: string;
  speciality: string;
  image?: IImage;
  experience: string;
  about: string;
  role: RoleValue;
  education: IEducation[];
  services: string;
  address?: IAddress;
  phone: string;
  fee: number;
  patients: string;
  awards: IAwards[];
  totalRating: number;
  averageRating: number;
  isActive: boolean;
  dateOfBirth?: string;
  gender?: "erkek" | "kadın" | "seçilmedi";
  workingHours: IWorkingHours[];
  approvalStatus: "pending" | "approved" | "rejected";
  isPaid: "unpaid" | "paid";
  createdAt?: Date;
  updatedAt?: Date;
}
