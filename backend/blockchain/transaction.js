const crypto = require("crypto");

class Transaction {
  constructor(fromInstitution, toStudent, studentName, credentialData) {
    this.fromInstitution = fromInstitution; // e.g., CSUSB
    this.toStudent = toStudent; // e.g., student123
    this.studentName = studentName; // e.g., student123
    this.credentialData = credentialData; // e.g., { degree: 'MS CS', grade: 'A' }
    this.timestamp = new Date().toISOString();
    this.txHash = this.calculateHash();
  }

  calculateHash() {
    const data =
      this.fromInstitution +
      this.toStudent +
      this.studentName +
      JSON.stringify(this.credentialData) +
      this.timestamp;

    return crypto.createHash("sha256").update(data).digest("hex");
  }
}

module.exports = Transaction;
