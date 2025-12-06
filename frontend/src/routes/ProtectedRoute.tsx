import Loading from "@/features/Loading";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hook";

export const GuestRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export const RequireAuth = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/giris-yap"} replace />;
  }

  return <Outlet />;
};

export const ProtectedDoctor = () => {
   const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/giris-yap"} replace />;
  }

  if (user.role !== "doctor") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export const ProtectedPatient = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/giris-yap"} replace />;
  }

  if (user.role !== "patient") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export const ProtectedAdmin = () => {
   const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/giris-yap"} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};
