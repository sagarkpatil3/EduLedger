// src/features/student/ProtectedDashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function ProtectedDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user?.role === "student") {
      setAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return authenticated ? <Dashboard /> : null;
}
