import { lazy, Suspense } from "react";
import Loading from "@/features/Loading";
import NotFound from "@/features/NotFound";
import AuthLayout from "@/layouts/AuthLayout";
import {GuestRoute} from "@/routes/ProtectedRoute"

const Login = lazy(() => import("@/features/auth/Login"));
const SignupDoctor = lazy(() => import("@/features/auth/SignupDoctor"));
const SignupPatient = lazy(() => import("@/features/auth/SignupPatient"));

export const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <GuestRoute />,
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
    },
  ],
};
