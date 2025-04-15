import { useState } from "react";
import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import API from "../../api/client";

export default function VerifyCredential() {
  const [txHash, setTxHash] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    setResult(null);
    try {
      const res = await API.get("/ledger/chain");
      const tx = res.data
        .flatMap((block) => block.transactions.map((tx) => ({ ...tx, blockNumber: block.index })))
        .find((t) => t.txHash === txHash);

      if (!tx) return setError("Credential not found.");
      setResult(tx);
    } catch (err) {
      setError("Verification failed.");
    }
  };

  return (
    <Box maxWidth="500px" mx="auto">
      <Typography variant="h4" gutterBottom>🔍 Verify Credential</Typography>

      <TextField
        label="Transaction Hash"
        fullWidth
        margin="normal"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleVerify} sx={{ mt: 2 }}>
        Verify
      </Button>

      {error && <Typography color="error" mt={2}>{error}</Typography>}

      {result && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">{result.credentialData.degree}</Typography>
            <Typography>Issued to: {result.toStudent}</Typography>
            <Typography>Issued by: {result.fromInstitution}</Typography>
            <Typography>Grade: {result.credentialData.grade}</Typography>
            <Typography>Year: {result.credentialData.year}</Typography>
            <Typography variant="caption">Block #: {result.blockNumber}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

