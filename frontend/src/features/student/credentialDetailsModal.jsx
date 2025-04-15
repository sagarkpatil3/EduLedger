import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, IconButton } from "@mui/material";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

export default function CredentialDetailsModal({ open, onClose, credential }) {
  const [copied, setCopied] = useState(false);
  if (!credential) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(credential.txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Credential Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{credential.credentialData.degree}</Typography>
        <Typography>Issued to: {credential.toStudent}</Typography>
        <Typography>Grade: {credential.credentialData.grade}</Typography>
        <Typography>Year: {credential.credentialData.year}</Typography>
        <Typography>Issuer: {credential.fromInstitution}</Typography>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">TX Hash:</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" noWrap>{credential.txHash}</Typography>
            <IconButton size="small" onClick={handleCopy}>
              {/* <ContentCopyIcon fontSize="small" /> */}
            </IconButton>
            {copied && <Typography ml={1} variant="caption" color="success.main">Copied!</Typography>}
          </Box>
        </Box>
        <Typography variant="caption" display="block" mt={1}>Block #: {credential.blockNumber}</Typography>
        <Typography variant="caption" display="block">Timestamp: {new Date(credential.timestamp).toLocaleString()}</Typography>
      </DialogContent>
    </Dialog>
  );
}