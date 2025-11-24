import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import errorMiddleware from "./middlewares/error.middleware";
import authRoute from "./routes/auth.route";



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
app.use("/api/v1",authRoute)


// Deploy (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use(errorMiddleware)

export default app;
