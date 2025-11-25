import {Router} from "express"
import patientController from "../controllers/patient.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const patientRoute = Router();

patientRoute.post("/patient/register",patientController.register);

patientRoute.put("/patient/update",isAuthenticatedUser,patientController.updateMyProfile);



export default patientRoute