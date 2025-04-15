import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EduLedger
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Student
        </Button>
        <Button color="inherit" component={Link} to="/issue">
          Issue
        </Button>
        <Button color="inherit" component={Link} to="/verify">
          Verify
        </Button>
      </Toolbar>
    </AppBar>
  );
}
