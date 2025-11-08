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
