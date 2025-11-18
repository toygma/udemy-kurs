import Dashboard from "@/features/admin/Dashboard";
import Loading from "@/features/Loading";
import NotFound from "@/features/NotFound";
import { Suspense } from "react";
import { ProtectedAdmin } from "./ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AddDoctor from "@/features/admin/AddDoctor";
import DoctorRequests from "@/features/admin/DoctorRequestTable";
import UsersManagement from "@/features/admin/UsersManagement";

export const AdminRoutes = {
  path: "/admin/panel",
  element: <AdminLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <ProtectedAdmin />,
      children: [
        {
          path: "",
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
              <DoctorRequests />
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
