import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        🎓 Welcome to EduLedger
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" mb={4}>
        Blockchain-powered credential verification for the modern academic world.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {[
          {
            title: "Student Portal",
            desc: "Access and manage your academic credentials.",
            path: "/dashboard",
          },
          {
            title: "Issue Credential",
            desc: "Professors and institutions can issue degrees securely.",
            path: "/issue",
          },
          {
            title: "Verify Credential",
            desc: "Verify credentials by transaction hash in seconds.",
            path: "/verify",
          },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{item.desc}</Typography>
                <Button variant="contained" component={Link} to={item.path}>
                  Go to {item.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
