import { Suspense, lazy } from "react";
import NotFound from "@/features/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/features/Loading";
import Login from "@/features/auth/Login";
import { GuestRoute } from "./ProtectedRoute";
import SignupDoctor from "@/features/auth/SignupDoctor";
import SignupPatient from "@/features/auth/SignupPatient";

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
    {
      element: <GuestRoute />,
      children: [
        {
          path: "/giris-yap",
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ),
        },
         {
          path: "/hasta/kayit-ol",
          element: (
            <Suspense fallback={<Loading />}>
              <SignupPatient />
            </Suspense>
          ),
        },
         {
          path: "/doktor/kayit-ol",
          element: (
            <Suspense fallback={<Loading />}>
              <SignupDoctor />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
