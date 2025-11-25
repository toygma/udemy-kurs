import {Router} from "express"
import doctorController from "../controllers/doctor.controller";

const doctorRoute = Router();

doctorRoute.post("/doctor/register",doctorController.register);


export default doctorRoute