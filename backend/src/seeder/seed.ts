import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "../models/doctor.model";
import { doctorData } from "../data/doctorData";
import Appointment from "../models/appointment.model";
import { appointmentData } from "../data/appointmentData";

dotenv.config();

const SeederDoctor = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("veritabanı bağlandı!");

    await Doctor.deleteMany();
    await Appointment.deleteMany();
    console.log("eski doktorlar verisi silindi!");
    console.log("eski randevular verisi silindi!");

    await Doctor.insertMany(doctorData);
    await Appointment.insertMany(appointmentData);
    console.log("yeni doktorlar eklendi!");
    console.log(`Toplam: ${doctorData.length} doktor`);

    console.log("yeni randevular eklendi!");
    console.log(`Toplam: ${appointmentData.length} randevular`);

    await mongoose.connection.close();
    console.log("veritabanı kapandı!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

SeederDoctor();
