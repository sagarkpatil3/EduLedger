import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: App name or Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          EduLedger
        </Typography>

        {/* Right side: Dynamic Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* If user is not logged in */}
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {/* If user is logged in */}
          {user && (
            <>
              {/* Dynamic link based on role */}
              {user.user?.role === "student" && (
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>
              )}
              {user.user?.role === "professor" && (
                <Button color="inherit" component={Link} to="/issue">
                  Issue Credential
                </Button>
              )}
              {user.user?.role === "verifier" && (
                <Button color="inherit" component={Link} to="/verify">
                  Verify
                </Button>
              )}

              {/* Welcome Name */}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Welcome, {user.user?.name || "User"}
              </Typography>

              {/* Logout Button */}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
