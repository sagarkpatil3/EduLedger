import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CredentialDetailsModal({ open, onClose, credential }) {
  const [copied, setCopied] = useState(false);
  const captureRef = useRef();

  if (!credential) return null;

  const credentialLink = `${window.location.origin}/verify/${credential.txHash}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(credentialLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`credential_${credential.txHash.slice(0, 8)}.pdf`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center" fontWeight={700}>
        🎓 Credential Preview
      </DialogTitle>
      <DialogContent>
        {/* Capture Area for PDF */}
        <Box
          ref={captureRef}
          sx={{
            border: "2px solid #1976d2",
            borderRadius: 4,
            padding: 4,
            backgroundColor: "#f9f9f9",
            minHeight: "450px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top Center - University Name */}
          <Typography
            variant="h5"
            color="primary"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            {credential.fromInstitution}
          </Typography>

          {/* Certificate Core */}
          <Box textAlign="center" mt={2}>
            <Typography variant="h6">This Certifies That</Typography>
            <Typography variant="h4" fontWeight={700} mb={2}>
              {credential.studentName || "Student Name"}
            </Typography>

            <Typography variant="h6">
              has successfully completed the Degree of:
            </Typography>
            <Typography variant="h5" color="text.secondary" mb={2}>
              {credential.credentialData.degree}
            </Typography>

            <Typography variant="body1" mb={2}>
              Grade: {credential.credentialData.grade} • Credits:{" "}
              {credential.credentialData.credits}
            </Typography>
          </Box>

          {/* Bottom Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={5}
          >
            {/* Left: Issued On, TX Hash */}
            <Box textAlign="left">
              <Typography variant="caption" display="block">
                📅 Issued On:{" "}
                {new Date(credential.timestamp).toLocaleDateString()}
              </Typography>
              <Typography variant="caption" display="block" noWrap>
                🔗 TX Hash: {credential.txHash?.slice(0, 20)}...
              </Typography>
            </Box>

            {/* Right: Verified + QR Code */}
            <Box textAlign="right">
              <Typography
                variant="caption"
                color="success.main"
                fontWeight={700}
              >
                ✅ Blockchain Verified
              </Typography>
              <QRCode
                value={credentialLink}
                size={70}
                qrStyle="dots"
                eyeRadius={5}
              />
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          mt={4}
          flexWrap="wrap"
        >
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            size="small"
          >
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadPDF}
            size="small"
          >
            Download PDF
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
