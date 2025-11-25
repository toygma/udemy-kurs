import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import errorMiddleware from "./middlewares/error.middleware";
import patientRoute from "./routes/patient.route";
import userRoute from "./routes/user.route";
import doctorRoute from "./routes/doctor.route";



const app: Express = express();


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

// Routes
app.use("/api/v1",patientRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",doctorRoute)


// Deploy (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use(errorMiddleware)

export default app;
