import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import CredentialCard from "../student/CredentialCard";
import { getDummyCredentials } from "../../data/dummyCredentials";

import API from "../../api/client";

export default function VerifyCredential() {
  const [txHash, setTxHash] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      // Try backend first
      const res = await API.get("/ledger/chain");
      const tx = res.data
        .flatMap((block) =>
          block.transactions.map((tx) => ({ ...tx, blockNumber: block.index }))
        )
        .find((t) => t.txHash === txHash);

      if (!tx) throw new Error("Credential not found in live data.");
      setResult(tx);
    } catch (err) {
      console.error("Backend fetch failed, checking dummy data...");
      // Fall back to dummy local data
      const dummyData = getDummyCredentials();
      const tx = dummyData.find((t) => t.txHash === txHash);

      if (!tx) {
        setError("Credential not found.");
      } else {
        setResult(tx);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={6}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        🔍 Verify Credential
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Transaction Hash"
          variant="outlined"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          disabled={!txHash || loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 4 }}>
          ❌ {error}
        </Alert>
      )}

      {result && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom textAlign="center">
            ✅ Credential Found
          </Typography>
          <CredentialCard credential={result} onClick={() => {}} />
        </Box>
      )}
    </Box>
  );
}
