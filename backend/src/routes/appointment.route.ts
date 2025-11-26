import { Router } from "express";
import appointmentController from "../controllers/appointment.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";


const router = Router();


router.post("/",isAuthenticatedUser, appointmentController.createAppointment);

router.put("/:id",isAuthenticatedUser, appointmentController.updateAppointmentStatus);

export default router;