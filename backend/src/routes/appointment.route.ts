import { Router } from "express";
import appointmentController from "../controllers/appointment.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const appointmentRoute = Router();

appointmentRoute.post(
  "/",
  isAuthenticatedUser,
  appointmentController.createAppointment
);
appointmentRoute.put(
  "/:id",
  isAuthenticatedUser,
  appointmentController.updateAppointmentStatus
);



export default appointmentRoute;
