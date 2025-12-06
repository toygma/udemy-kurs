import { lazy, Suspense } from "react";

import NotFound from "@/features/NotFound";
import Loading from "@/features/Loading";
import { ProtectedAdmin } from "./ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";

const Dashboard = lazy(() => import("@/features/admin/Dashboard"));
const AddDoctor = lazy(() => import("@/features/admin/AddDoctor"));
const DoctorRequestTable = lazy(
  () => import("@/features/admin/DoctorRequestTable")
);
const UsersManagement = lazy(() => import("@/features/admin/UsersManagement"));

export const AdminRoutes = {
  path: "/admin/panel",
  element: <AdminLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <ProtectedAdmin />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "doktor-ekle",
          element: (
            <Suspense fallback={<Loading />}>
              <AddDoctor />
            </Suspense>
          ),
        },
        {
          path: "doktor-onayla",
          element: (
            <Suspense fallback={<Loading />}>
              <DoctorRequestTable />
            </Suspense>
          ),
        },
        {
          path: "kullanici-ayarlari",
          element: (
            <Suspense fallback={<Loading />}>
              <UsersManagement />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
