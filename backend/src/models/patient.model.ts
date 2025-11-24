import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

interface IImage {
  public_id: string;
  url: string;
}

interface IAddress {
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}

export interface IPatient extends Document {
  name: string;
  email: string;
  password: string;
  address?: IAddress;
  gender?: "male" | "female" |  "not_selected";
  phone?: string;
  image?: IImage;
  dateOfBirth?: Date;
  paymentId?: string;
  role: "patient";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  getJwtToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const patientSchema = new Schema<IPatient>(
  {
    name: {
      type: String,
      required: [true, "İsim gereklidir"],
      trim: true,
      minlength: [2, "İsim en az 2 karakter olmalıdır"],
      maxlength: [50, "İsim en fazla 50 karakter olabilir"],
    },
    password: {
      type: String,
      required: [true, "Şifre gereklidir"],
      minlength: [6, "Şifre en az 6 karakter olmalıdır"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "Email gereklidir"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      zipCode: String,
      country: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "not_selected"],
      default: "not_selected",
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    role: {
      type: String,
      default: "patient",
    },
    paymentId: {
      type: String,
    },
    image: {
      public_id: String,
      url: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error; 
  }
});

patientSchema.methods.getJwtToken = function (this: IPatient): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_TIME!;

  return jwt.sign({ id: this._id }, secret, { expiresIn } as SignOptions);
};

patientSchema.methods.comparePassword = async function (
  this: IPatient,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};



export default mongoose.model("Patient", patientSchema);