import express from "express"
import { isAuthenticatedUser } from "../middlewares/auth.middleware"
import stripeController from "../controllers/stripe.controller"

const stripeRoute = express.Router()

stripeRoute.post("/checkout-session/:doctorId/:appointmentId",isAuthenticatedUser,stripeController.getCheckoutSession)



export default stripeRoute