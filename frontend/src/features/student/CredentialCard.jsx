// src/features/student/CredentialCard.jsx

import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";

export default function CredentialCard({ credential, onClick }) {
  const { credentialData, fromInstitution, studentName, txHash, timestamp } =
    credential;

  // Determine border color based on grade
  const getBorderColor = (grade) => {
    if (grade.startsWith("A")) return "success.main"; // Green
    if (grade.startsWith("B")) return "warning.main"; // Yellow
    return "error.main"; // Red for C, D
  };

  return (
    <Card
      elevation={4}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: 2,
        borderColor: getBorderColor(credentialData.grade),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
        backgroundColor: "#fafafa",
        p: 2,
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: "100%" }}>
        <CardContent sx={{ textAlign: "center", height: "100%" }}>
          {/* Institution Name */}
          <Typography
            variant="subtitle2"
            color="primary"
            fontWeight={600}
            sx={{ mb: 1 }}
          >
            {fromInstitution}
          </Typography>

          {/* Certificate Title */}
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }} noWrap>
            {credentialData.degree}
          </Typography>

          {/* Student Name */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ mb: 1 }}
            noWrap
          >
            {studentName || "Student Name"}
          </Typography>

          {/* Grade, Year, Credits */}
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
            mt={1}
          >
            <Typography variant="body2">
              Grade: {credentialData.grade}
            </Typography>
            <Typography variant="body2">Year: {credentialData.year}</Typography>
            {credentialData.credits && (
              <Typography variant="body2">
                Credits: {credentialData.credits}
              </Typography>
            )}
          </Box>

          {/* Issue Date and Hash */}
          <Box mt={2}>
            <Typography variant="caption" color="text.disabled" display="block">
              Issued: {new Date(timestamp).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" color="text.disabled" noWrap>
              TX: {txHash?.slice(0, 10)}...
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
