import { createBrowserRouter } from "react-router";
import { AuthRoutes, MainRoutes } from "./MainRoutes";
import { DoctorRoutes } from "./DoctorRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([MainRoutes,DoctorRoutes,AdminRoutes,AuthRoutes]);
