import Loading from "@/features/Loading";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const user = true;
  const loading = true;

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export const ProtectedDoctor = () => {
  const user = { role: "doctor" };
  const loading = false;

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "doctor") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet/>
};

export const ProtectedAdmin = () => {
  const user = { role: "admin" };
  const loading = false;

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet/>
};

