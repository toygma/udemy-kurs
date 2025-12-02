import type { RoleValue } from "./doctor.types";

interface IImage {
  public_id: string;
  url: string;
}

interface IAddress {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}



export interface IPatient {
  _id:string;
  name: string;
  email: string;
  password: string;
  address?: IAddress;
  gender?: "male" | "female" | "not_selected";
  phone?: string;
  image?: IImage;
  dateOfBirth?: Date;
  paymentId?: string;
  role: RoleValue;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}