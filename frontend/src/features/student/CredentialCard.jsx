import { Card, CardContent, Typography } from "@mui/material";

export default function CredentialCard({ credential }) {
  const { credentialData, fromInstitution, toStudent, txHash, blockNumber, timestamp } = credential;

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6">{credentialData.degree}</Typography>
        <Typography variant="body2">Grade: {credentialData.grade} | Year: {credentialData.year}</Typography>
        <Typography variant="body2" mt={1}>Issued by: {fromInstitution}</Typography>
        <Typography variant="caption" color="text.secondary">TX Hash: {txHash?.slice(0, 12)}...</Typography><br />
        <Typography variant="caption" color="text.secondary">Block #: {blockNumber}</Typography><br />
        <Typography variant="caption" color="text.secondary">Time: {new Date(timestamp).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
}