import { Router } from "express";
import doctorController from "../controllers/doctor.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const doctorRoute = Router();

doctorRoute.get("/all", doctorController.getAllDoctors);

doctorRoute.post("/register", doctorController.register);

doctorRoute.get(
  "/:doctorId/availability",
  doctorController.getDoctorAvailability
);

doctorRoute.get("/:doctorId", doctorController.getDoctorById);

export default doctorRoute;
