import Loading from "@/features/Loading";
import { useAppSelector } from "@/store/hook";
import { Navigate, Outlet } from "react-router";

// Auth sayfaları için (zaten giriş yapmışsa ana sayfaya yönlendir)
export const GuestRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  
  if (loading) {
    return <Loading />;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

// Giriş yapmış herhangi bir kullanıcı için (role önemli değil)
export const RequireAuth = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  
  if (loading) {
    return <Loading />;
  }
  
  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }
  
  return <Outlet />;
};

// Doktor sayfaları için
export const ProtectedDoctor = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  
  if (loading) {
    return <Loading />;
  }
  
  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }
  
  if (user.role !== "doctor") {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

// Hasta sayfaları için
export const ProtectedPatient = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  
  if (loading) {
    return <Loading />;
  }
  
  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }
  
  if (user.role !== "patient") {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

// Admin sayfaları için
export const ProtectedAdmin = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  
  if (loading) {
    return <Loading />;
  }
  
  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }
  
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};