import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import API from "../../api/client"; // <-- Don't forget to import API client
import {
  saveDummyCredentials,
  getDummyCredentials,
} from "../../data/dummyCredentials";

export default function IssueCredential() {
  const [form, setForm] = useState({
    fromInstitution: "CSUSB",
    toStudent: "",
    studentName: "",
    degree: "",
    grade: "",
    year: "",
    credits: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));

    const newCredential = {
      fromInstitution: form.fromInstitution,
      toStudent: form.toStudent,
      studentName: form.studentName,
      credentialData: {
        degree: form.degree,
        grade: form.grade,
        year: parseInt(form.year),
        credits: parseInt(form.credits),
      },
    };

    try {
      await API.post("/ledger/issue", newCredential, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setSuccess(true);
      setForm({
        fromInstitution: "CSUSB",
        toStudent: "",
        studentName: "",
        degree: "",
        grade: "",
        year: "",
        credits: "",
      });
    } catch (err) {
      console.error("API issue failed, saving to dummy data");
      const oldDummy = getDummyCredentials();
      const updatedDummy = [
        ...oldDummy,
        {
          ...newCredential,
          txHash: "0x" + Math.random().toString(16).substr(2, 12),
          timestamp: new Date().toISOString(),
          blockNumber: Math.floor(Math.random() * 1000),
        },
      ];
      saveDummyCredentials(updatedDummy);
      setSuccess(true);
      setForm({
        fromInstitution: "CSUSB",
        toStudent: "",
        studentName: "",
        degree: "",
        grade: "",
        year: "",
        credits: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="500px" mx="auto" p={2}>
      <Typography variant="h4" gutterBottom textAlign="center">
        🧾 Issue Credential
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Student Email"
          name="toStudent"
          fullWidth
          margin="normal"
          value={form.toStudent}
          onChange={handleChange}
          required
        />
        <TextField
          label="Student Name"
          name="studentName"
          fullWidth
          margin="normal"
          value={form.studentName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Degree"
          name="degree"
          fullWidth
          margin="normal"
          value={form.degree}
          onChange={handleChange}
          required
        />
        <TextField
          label="Grade"
          name="grade"
          fullWidth
          margin="normal"
          value={form.grade}
          onChange={handleChange}
          required
        />
        <TextField
          label="Year"
          name="year"
          type="number"
          fullWidth
          margin="normal"
          value={form.year}
          onChange={handleChange}
          required
        />
        <TextField
          label="Credits"
          name="credits"
          type="number"
          fullWidth
          margin="normal"
          value={form.credits}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? "Issuing..." : "Issue Credential"}
        </Button>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Credential issued successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      {error && (
        <Snackbar open autoHideDuration={4000} onClose={() => setError("")}>
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
