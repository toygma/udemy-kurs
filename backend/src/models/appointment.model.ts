import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAppointment extends Document {
  _id: Types.ObjectId;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled";
  isPaid: "unpaid" | "paid";
  paymentId?: string;
  session?: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    paymentId: {
      type: String,
    },
    session: {
      type: String,
    },
  },
  { timestamps: true }
);


const Appointment =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;