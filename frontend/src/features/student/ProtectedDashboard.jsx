import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function ProtectedDashboard() {
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user?.role === "student" || true) {
      setAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return authenticated ? <Dashboard /> : null;
}