// src/features/student/Dashboard.jsx

import { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Button } from "@mui/material";
import CredentialCard from "./CredentialCard";
import CredentialDetailsModal from "./CredentialDetailsModal";
import FilterBar from "./FilterBar";
import API from "../../api/client";
import { getDummyCredentials } from "../../data/dummyCredentials";

export default function Dashboard() {
  const [credentials, setCredentials] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const res = await API.get("/ledger/chain");
        const txList = res.data.flatMap((block) =>
          block.transactions.map((tx) => ({ ...tx, blockNumber: block.index }))
        );
        setCredentials(txList);
        setFiltered(txList);
      } catch (err) {
        console.error("API error, using dummy data:", err.message);
        const dummyData = getDummyCredentials();
        setCredentials(dummyData);
        setFiltered(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const results = credentials.filter(
      (cred) =>
        cred.credentialData.degree.toLowerCase().includes(q) ||
        cred.credentialData.year.toString().includes(q) ||
        cred.fromInstitution.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [search, credentials]);

  const totalCredits = credentials.reduce((acc, curr) => {
    // Safely read academic credits if available, otherwise 0
    return acc + (curr.credentialData.credits || 0);
  }, 0);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🎓 My Credentials
      </Typography>

      <FilterBar search={search} setSearch={setSearch} />

      <Box mb={3} mt={2}>
        <Typography variant="h6" color="primary">
          📚 Total Credits Earned: {totalCredits}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filtered.map((cred, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <CredentialCard
              credential={cred}
              onClick={() => setSelected(cred)}
            />
          </Grid>
        ))}
      </Grid>

      <CredentialDetailsModal
        open={!!selected}
        onClose={() => setSelected(null)}
        credential={selected}
      />
    </Box>
  );
}
