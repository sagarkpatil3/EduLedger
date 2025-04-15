import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box textAlign="center">
      <Typography variant="h3" gutterBottom>
        Welcome to EduLedger
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard"
          sx={{ m: 1 }}
        >
          Student Portal
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/issue"
          sx={{ m: 1 }}
        >
          Issue Credential
        </Button>
        <Button variant="outlined" component={Link} to="/verify" sx={{ m: 1 }}>
          Verify Credential
        </Button>
      </Box>
    </Box>
  );
}
