import {Router} from "express"
import authController from "../controllers/auth.controller";

const authRoute = Router();

authRoute.post("/register",authController.registerPatient);


export default authRoute