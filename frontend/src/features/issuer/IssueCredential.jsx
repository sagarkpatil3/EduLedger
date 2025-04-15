import { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import API from "../../api/client";

export default function IssueCredential() {
  const [form, setForm] = useState({
    fromInstitution: "CSUSB",
    toStudent: "",
    degree: "",
    grade: "",
    year: ""
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

    try {
      const res = await API.post("/ledger/issue", form);
      setSuccess(true);
      setForm({ fromInstitution: "CSUSB", toStudent: "", degree: "", grade: "", year: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="500px" mx="auto">
      <Typography variant="h4" gutterBottom>🧾 Issue Credential</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Student ID or Email"
          name="toStudent"
          fullWidth
          margin="normal"
          value={form.toStudent}
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
          fullWidth
          margin="normal"
          value={form.year}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Issuing..." : "Issue Credential"}
        </Button>
      </form>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Credential issued successfully!</Alert>
      </Snackbar>

      {error && (
        <Snackbar open autoHideDuration={4000} onClose={() => setError("")}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Box>
  );
}