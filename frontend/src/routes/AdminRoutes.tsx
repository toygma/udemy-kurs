import Dashboard from "@/features/admin/Dashboard";
import Loading from "@/features/Loading";
import NotFound from "@/features/NotFound";
import { Suspense } from "react";
import { ProtectedAdmin } from "./ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AddDoctor from "@/features/admin/AddDoctor";

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
      ],
    },
  ],
};
