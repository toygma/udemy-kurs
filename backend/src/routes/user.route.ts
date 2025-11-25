import {Router} from "express"
import userController from "../controllers/user.controller";

const userRoute = Router();

userRoute.post("/login",userController.login);
userRoute.post("/logout",userController.logout);


export default userRoute