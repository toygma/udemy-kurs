import { lazy, Suspense } from "react";

import DoctorLayout from "../layouts/DoctorLayout";
import NotFound from "@/features/NotFound";
import Loading from "@/features/Loading";
import { ProtectedDoctor } from "./ProtectedRoute";


const Dashboard = lazy(()=>import("@/features/doctorPanel/Dashboard"))


export const DoctorRoutes = {
  path: "/doktor/panel",
  element: <DoctorLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <ProtectedDoctor />,
      children: [
        {
          path: ":id",
          element: (
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          ),
        },
      ],
    },
  ],
};