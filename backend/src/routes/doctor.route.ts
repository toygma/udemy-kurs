import {Router} from "express"
import doctorController from "../controllers/doctor.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const doctorRoute = Router();

doctorRoute.post("/register",doctorController.register);

doctorRoute.get("/",isAuthenticatedUser,doctorController.getAppointments);

doctorRoute.get("/:doctorId",isAuthenticatedUser,doctorController.getDoctorAvailability);



export default doctorRoute