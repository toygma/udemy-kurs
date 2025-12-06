import { Suspense, lazy } from "react";
import NotFound from "@/features/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/features/Loading";
import { RequireAuth, ProtectedPatient } from "./ProtectedRoute";

const HomePage = lazy(() => import("@/features/home/HomePage"));
const Doctors = lazy(() => import("@/features/doctor/Doctors"));
const DoctorDetail = lazy(() => import("@/features/doctor/DoctorDetail"));
const MyProfile = lazy(() => import("@/features/patient/MyProfile"));
const MyAppointments = lazy(() => import("@/features/patient/MyAppointments"));

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    // Giriş yapmış tüm kullanıcılar için (doctor, patient, admin)
    {
      element: <RequireAuth />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/doktorlar",
          element: (
            <Suspense fallback={<Loading />}>
              <Doctors />
            </Suspense>
          ),
        },
        {
          path: "/detay/doktor/:name/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <DoctorDetail />
            </Suspense>
          ),
        },
      ],
    },
    // Sadece hasta kullanıcılar için
    {
      element: <ProtectedPatient />,
      children: [
        {
          path: "/profil",
          element: (
            <Suspense fallback={<Loading />}>
              <MyProfile />
            </Suspense>
          ),
        },
        {
          path: "/randevularim",
          element: (
            <Suspense fallback={<Loading />}>
              <MyAppointments />
            </Suspense>
          ),
        },
      ],
    },
  ],
};