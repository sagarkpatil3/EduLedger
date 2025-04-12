const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: String,
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  previousHash: String,
  hash: String,
});

module.exports = mongoose.model("Block", blockSchema);
