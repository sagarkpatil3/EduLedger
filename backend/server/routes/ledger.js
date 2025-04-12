const express = require("express");
const router = express.Router();
const ledgerController = require("../controllers/ledgerController");

// Route to issue a new credential (can be protected with auth/role middleware)
router.post("/issue", ledgerController.issueCredential);

// Route to get the full blockchain with populated transaction data
router.get("/chain", ledgerController.getFullChain);

// (Optional) Add a route to verify a transaction by hash
// router.get("/verify/:txHash", ledgerController.verifyCredential);

module.exports = router;
