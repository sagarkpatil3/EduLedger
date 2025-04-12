const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  fromInstitution: String,
  toStudent: String,
  credentialData: {
    degree: String,
    grade: String,
    year: Number,
  },
  timestamp: String,
  txHash: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
