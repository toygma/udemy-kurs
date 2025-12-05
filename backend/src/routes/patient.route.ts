import { Router } from "express";
import patientController from "../controllers/patient.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const patientRoute = Router();

patientRoute.post("/register", patientController.register);

patientRoute.put(
  "/update",
  isAuthenticatedUser,
  patientController.updateMyProfile
);



export default patientRoute;
