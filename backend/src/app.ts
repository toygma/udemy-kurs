import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import RegisterUser from "./test"; // örnek controller
import errorMiddleware from "./middlewares/error.middleware";

const app: Express = express();
const router = express.Router();
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
router.post("/auth", RegisterUser);

// Router'ı app'e eklemeyi unutma
app.use("/api", router);

// Deploy (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use(errorMiddleware);


export default app;
