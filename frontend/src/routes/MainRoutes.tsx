import { Suspense, lazy } from "react";
import NotFound from "@/features/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/features/Loading";
import AuthLayout from "@/layouts/AuthLayout";

// Lazy imports
const HomePage = lazy(() => import("@/features/home/HomePage"));
const Doctors = lazy(() => import("@/features/doctor/Doctors"));
const DoctorDetail = lazy(() => import("@/features/doctor/DoctorDetail"));
const MyProfile = lazy(() => import("@/features/patient/MyProfile"));
const MyAppointments = lazy(() => import("@/features/patient/MyAppointments"));
const SignupPatient = lazy(() => import("@/features/auth/SignupPatient"));
const SignupDoctor = lazy(() => import("@/features/auth/SignupDoctor"));
const Login = lazy(() => import("@/features/auth/Login"));

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
  ],
};

export const AuthRoutes = {
  path: "/", 
  element: <AuthLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "giris-yap",
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "hasta/kayit",
      element: (
        <Suspense fallback={<Loading />}>
          <SignupPatient />
        </Suspense>
      ),
    },
    {
      path: "doktor/kayit",
      element: (
        <Suspense fallback={<Loading />}>
          <SignupDoctor />
        </Suspense>
      ),
    },
  ],
};