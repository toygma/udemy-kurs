import { Router } from "express";
import userController from "../controllers/user.controller";

import {isAuthenticatedUser} from "../middlewares/auth.middleware";

const userRoute = Router();

userRoute.post("/login", userController.login);
userRoute.post("/logout", userController.logout);

userRoute.get("/me", isAuthenticatedUser, userController.getMeProfile);

export default userRoute;
