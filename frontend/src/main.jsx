// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { CssBaseline } from "@mui/material"; // Resets default browser styling
import { BrowserRouter } from "react-router-dom"; // fallback if router needs wrapping
import "./index.css"; // Your global CSS (keep it small and clean)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
