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
  name: string;
  email: string;
  password: string;
  address?: IAddress;
  gender?: "male" | "female" | "not_selected";
  phone?: string;
  image?: IImage;
  dateOfBirth?: Date;
  paymentId?: string;
  role: "patient";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
