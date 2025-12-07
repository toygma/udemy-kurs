import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import errorMiddleware from "./middlewares/error.middleware";

//ROUTES
import patientRoute from "./routes/patient.route";
import doctorRoute from "./routes/doctor.route";
import userRoute from "./routes/user.route";
import appointmentRoute from "./routes/appointment.route";
import reviewsRoute from "./routes/reviews.route";
import adminRoute from "./routes/admin.route";
import stripeRoute from "./routes/stripe.route";
import { handleStripeWebhook } from "./controllers/webhook.controller";

const app: Express = express();

app.post(
  "/api/v1/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1/patients", patientRoute);

app.use("/api/v1/doctors", doctorRoute);

app.use("/api/v1/users", userRoute);

app.use("/api/v1/appointments", appointmentRoute);

app.use("/api/v1/reviews", reviewsRoute);

app.use("/api/v1/admin", adminRoute);

app.use("/api/v1/payment", stripeRoute);

// Deploy (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use(errorMiddleware);

export default app;
