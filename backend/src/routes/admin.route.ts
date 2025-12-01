import { Router } from "express";
import adminController from "../controllers/admin.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const adminRoute = Router();

adminRoute.get("/", isAuthenticatedUser, adminController.getAnalyticsData);
adminRoute.get(
  "/doctor/pending",
  isAuthenticatedUser,
  adminController.getPendingDoctors
);

adminRoute.post("/", isAuthenticatedUser, adminController.doctorAdd);

adminRoute.put(
  "/doctor/approve/:id",
  isAuthenticatedUser,
  adminController.approveDoctor
);

adminRoute.put(
  "/doctor/reject/:id",
  isAuthenticatedUser,
  adminController.rejectDoctor
);
adminRoute.put("/:id", isAuthenticatedUser, adminController.toggleUserStatus);
adminRoute.put(
  "/:id/role",
  isAuthenticatedUser,
  adminController.toggleUserRole
);

export default adminRoute;
