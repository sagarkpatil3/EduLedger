import { createBrowserRouter } from "react-router-dom";

// Pages and Features
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Dashboard from "../features/student/Dashboard";
// import ProtectedDashboard from "../features/student/ProtectedDashboard";
import IssueCredential from "../features/issuer/IssueCredential";
import VerifyCredential from "../features/verifier/VerifyCredential";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import PublicCredential from "../features/verifier/PublicCredential";
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> }, // ✅ Protected Student Portal
      {
        element: <ProtectedRoute allowedRoles={["student"]} />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
      // { path: "/issue", element: <IssueCredential /> },
      // { path: "/verify", element: <VerifyCredential /> },
      // ✅ Protected Issuer Portal
      {
        element: <ProtectedRoute allowedRoles={["professor"]} />,
        children: [{ path: "/issue", element: <IssueCredential /> }],
      },

      // ✅ Protected Verifier Portal
      {
        element: <ProtectedRoute allowedRoles={["verifier"]} />,
        children: [{ path: "/verify", element: <VerifyCredential /> }],
      },

      // ✅ Public Verification Page (anyone can access)
      { path: "/verify/:txHash", element: <PublicCredential /> },
    ],
  },
]);

export default router;
