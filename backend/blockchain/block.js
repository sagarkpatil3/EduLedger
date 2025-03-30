const crypto = require("crypto");

class Block {
  constructor(index, timestamp, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const blockData =
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions);
    return crypto.createHash("sha256").update(blockData).digest("hex");
  }
}

module.exports = Block;
