import { Suspense, lazy } from "react";
import NotFound from "@/features/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/features/Loading";

const HomePage = lazy(() => import("@/features/home/HomePage"));
const Doctors = lazy(() => import("@/features/doctor/Doctors"));

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
  ],
};
