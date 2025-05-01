// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Container } from "@mui/material";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, minHeight: "90vh" }}>
        <Outlet />
      </Container>
    </>
  );
}
