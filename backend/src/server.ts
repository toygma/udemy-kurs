import "dotenv/config";
import app from "./app";
import connectedDatabase from "./db/db";
import mongoose from "mongoose";

const PORT = process.env.PORT;

let server: ReturnType<typeof app.listen>;

const startServer = async () => {
  try {
    await connectedDatabase();

    server = app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      console.log(`Environment:${process.env.NODE_ENV || "development"}`);
    });

    process.on("SIGTERM", shutdownServer);
    process.on("SIGINT", shutdownServer);
  } catch (error) {
    console.log("Failed to start server", error);
    process.exit(1);
  }
};

const shutdownServer = async () => {
  console.log("Shutting down server gracefully");

  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      console.log("server closed");
      console.log("database disconnected");
      process.exit(0);
    });
  }

  setTimeout(() => {
    console.log("forced shutdown due to timeout");
    process.exit(1);
  }, 10000);
};

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception:", error);
  shutdownServer();
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection:", promise, "reason", reason);
  shutdownServer();
});

startServer();
