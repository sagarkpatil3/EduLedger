// src/features/verifier/PublicCredential.jsx

import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import API from "../../api/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getDummyCredentials } from "../../data/dummyCredentials";

export default function PublicCredential() {
  const { txHash } = useParams();
  const [credential, setCredential] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const captureRef = useRef();

  useEffect(() => {
    const fetchCredential = async () => {
      try {
        const res = await API.get("/ledger/chain");
        const tx = res.data
          .flatMap((block) =>
            block.transactions.map((tx) => ({
              ...tx,
              blockNumber: block.index,
            }))
          )
          .find((t) => t.txHash === txHash);

        if (!tx) throw new Error("Credential not found in blockchain");
        setCredential(tx);
      } catch (err) {
        console.error("Backend fetch failed, trying dummy data...");
        const dummyData = getDummyCredentials();
        const tx = dummyData.find((t) => t.txHash === txHash);
        if (!tx) {
          setError("Credential not found.");
        } else {
          setCredential(tx);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCredential();
  }, [txHash]);

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

  if (loading)
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box textAlign="center" mt={8}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box p={4}>
      <Box
        ref={captureRef}
        sx={{
          border: "2px solid #1976d2",
          borderRadius: 4,
          padding: 4,
          backgroundColor: "#f9f9f9",
          minHeight: "500px",
          maxWidth: "800px",
          mx: "auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Institution Name */}
        <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
          {credential.fromInstitution}
        </Typography>

        {/* Main Title */}
        <Typography variant="h6" gutterBottom>
          This Certifies That
        </Typography>

        {/* Student Name */}
        <Typography variant="h4" fontWeight={700} mb={2}>
          {credential.studentName || "Student Name"}
        </Typography>

        {/* Degree */}
        <Typography variant="h6" gutterBottom>
          has successfully completed the Degree of:
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={2}>
          {credential.credentialData.degree}
        </Typography>

        {/* Grade and Credits */}
        <Typography variant="body1" mb={2}>
          Grade: {credential.credentialData.grade} • Credits:{" "}
          {credential.credentialData.credits}
        </Typography>

        {/* Bottom Section: Issued On + TX Hash + QR */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={6}
        >
          {/* Left Side */}
          <Box textAlign="left">
            <Typography variant="caption" display="block">
              📅 Issued On:{" "}
              {new Date(credential.timestamp).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" display="block" noWrap>
              🔗 TX Hash: {credential.txHash?.slice(0, 20)}...
            </Typography>
          </Box>

          {/* Right Side */}
          <Box textAlign="right">
            <Typography variant="caption" color="success.main" fontWeight={700}>
              ✅ Blockchain Verified
            </Typography>
            <QRCode
              value={`${window.location.origin}/verify/${credential.txHash}`}
              size={70}
              qrStyle="dots"
              eyeRadius={5}
            />
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="center" gap={2} mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadPDF}
          size="small"
        >
          Download PDF
        </Button>
      </Box>
    </Box>
  );
}
