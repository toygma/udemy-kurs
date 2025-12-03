import { Router } from "express";
import doctorController from "../controllers/doctor.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const doctorRoute = Router();

// ÖNEMLİ: Spesifik route'lar parametreli route'lardan ÖNCE gelmeli!

// 1. Tüm doktorları listele (PUBLIC veya AUTH - ihtiyaca göre)
doctorRoute.get("/all", doctorController.getAllDoctors);

// 2. Doktor kaydı oluştur
doctorRoute.post("/register", doctorController.register);

// 3. Kullanıcının randevularını getir (AUTH gerekli)
doctorRoute.get("/appointments", isAuthenticatedUser, doctorController.getAppointments);

// 4. Belirli bir doktorun müsaitlik durumu (PUBLIC)
doctorRoute.get("/:doctorId/availability", doctorController.getDoctorAvailability);

// 5. Belirli bir doktorun detaylarını getir (PUBLIC - ihtiyaca göre ekleyin)
// doctorRoute.get("/:doctorId", doctorController.getDoctorById);

export default doctorRoute;