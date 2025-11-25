import { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import mongoose from "mongoose";

interface IEducation {
  degree: string;
  university: string;
  year: string;
}

interface IImage {
  public_id: string;
  url: string;
}

export interface IWorkingHours {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

interface IAddress {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

interface IAwards {
  title: string;
  year: string;
  organization: string;
}

export interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  speciality: string;
  available: boolean;
  image?: IImage;
  experience: string;
  about: string;
  role: "doctor";
  education: IEducation[];
  services: string;
  address?: IAddress;
  phone: string;
  fee: number;
  patients: string;
  awards: IAwards[];
  totalRating: number;
  averageRating: number;
  workingHours: IWorkingHours[];
  isPaid: "unpaid" | "paid";
  getJwtToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;

  createdAt?: Date;
  updatedAt?: Date;
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: [true, "İsim alanı zorunludur."] },
    email: {
      type: String,
      required: [true, "E-posta alanı zorunludur."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Şifre alanı zorunludur."],
      minlength: 6,
      select: false,
    },
    speciality: { type: String },
    role: { type: String, default: "doctor" },
    image: {
      public_id: String,
      url: String,
    },
    totalRating: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    experience: { type: String },
    about: { type: String },
    isPaid: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    education: [
      {
        degree: { type: String },
        university: { type: String },
        year: { type: String },
      },
    ],
    services: { type: String },
    address: {
      street: String,
      city: String,
      zipCode: String,
      country: String,
    },
    phone: { type: String },
    fee: { type: Number, default: 100 },
    patients: { type: String },
    awards: [
      {
        title: { type: String },
        year: { type: String },
        organization: { type: String },
      },
    ],
    workingHours: [
      {
        day: { type: String, required: true },
        isWorking: { type: Boolean, default: false },
        startTime: { type: String, default: "09:00" },
        endTime: { type: String, default: "17:00" },
      },
    ],
  },
  { timestamps: true }
);


doctorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

doctorSchema.methods.getJwtToken = function (this: IDoctor): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_TIME!;

  return jwt.sign({ id: this._id }, secret, { expiresIn } as SignOptions);
};

doctorSchema.methods.comparePassword = async function (
  this: IDoctor,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;