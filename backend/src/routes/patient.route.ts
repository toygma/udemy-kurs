import {Router} from "express"
import patientController from "../controllers/patient.controller";

const patientRoute = Router();

patientRoute.post("/patient/register",patientController.register);


export default patientRoute