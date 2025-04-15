import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import StudentDashboard from "../features/student/ProtectedDashboard";
import IssueCredential from "../features/issuer/IssueCredential";
import VerifyCredential from "../features/verifier/VerifyCredential";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // shared layout like Navbar
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/dashboard", element: <StudentDashboard /> },
      { path: "/issue", element: <IssueCredential /> },
      { path: "/verify", element: <VerifyCredential /> }
    ],
  },
]);

export default router;

