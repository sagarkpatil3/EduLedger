import { useEffect, useState } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import CredentialCard from "./CredentialCard";
import CredentialDetailsModal from "./credentialDetailsModal";
import FilterBar from "./FilterBar";
import API from "../../api/client";

export default function Dashboard() {
  const [credentials, setCredentials] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await API.get("/ledger/chain");
        const txList = res.data
          .flatMap((block) => block.transactions.map((tx) => ({ ...tx, blockNumber: block.index })))
          .filter((tx) => tx.toStudent === user.user.email);
        setCredentials(txList);
        setFiltered(txList);
      } catch (err) {
        console.error("Error loading student credentials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const results = credentials.filter((cred) =>
      cred.credentialData.degree.toLowerCase().includes(q) ||
      cred.credentialData.year.toString().includes(q) ||
      cred.fromInstitution.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [search, credentials]);

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>🎓 My Credentials</Typography>
      <FilterBar search={search} setSearch={setSearch} />
      <Grid container spacing={3}>
        {filtered.map((cred, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <CredentialCard credential={cred} onClick={() => setSelected(cred)} />
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
