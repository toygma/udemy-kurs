import { Router } from "express";
import adminController from "../controllers/admin.controller";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const adminRoute = Router();

adminRoute.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.getAnalyticsData
);
adminRoute.get(
  "/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.getAllUsers
);

adminRoute.get(
  "/doctor/pending",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.getPendingDoctors
);

adminRoute.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.doctorAdd
);

adminRoute.put(
  "/doctor/approve/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.approveDoctor
);

adminRoute.put(
  "/doctor/reject/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.rejectDoctor
);
adminRoute.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.toggleUserStatus
);

adminRoute.put(
  "/:id/role",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.toggleUserRole
);

export default adminRoute;
