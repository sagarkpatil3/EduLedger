// src/app/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
