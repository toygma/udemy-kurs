import { createBrowserRouter } from "react-router";
import { MainRoutes } from "./MainRoutes";
import { DoctorRoutes } from "./DoctorRoutes";

export const router = createBrowserRouter([MainRoutes,DoctorRoutes]);
