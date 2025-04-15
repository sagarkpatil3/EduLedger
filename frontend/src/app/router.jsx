import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import IssueCredential from "../pages/IssueCredential";
import VerifyCredential from "../pages/VerifyCredential";
import Layout from "../components/Layout";

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
      { path: "/verify", element: <VerifyCredential /> },
    ],
  },
]);

export default router;
