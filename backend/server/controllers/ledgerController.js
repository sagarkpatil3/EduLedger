const Transaction = require("../../blockchain/Transaction");
const Blockchain = require("../../blockchain/blockchain");
const Block = require("../../blockchain/block");

const TransactionModel = require("../../models/transactionModel");
const BlockModel = require("../../models/blockModel");

// Create a new blockchain instance (or pull from cache/db)
const ledger = new Blockchain();

exports.issueCredential = async (req, res) => {
  try {
    const { fromInstitution, toStudent, studentName, credentialData } =
      req.body;

    // Step 1: Create a new transaction (in memory)
    const transaction = new Transaction(
      fromInstitution,
      toStudent,
      studentName,
      credentialData
    );

    // Step 2: Save transaction to DB
    const savedTx = await TransactionModel.create(transaction);

    // Step 3: Create a new block and attach the saved transaction’s _id
    const newBlock = new Block(
      ledger.chain.length,
      new Date().toISOString(),
      [savedTx._id],
      ledger.getLatestBlock().hash
    );

    ledger.addBlock(newBlock);

    // Step 4: Save block to DB
    const savedBlock = await BlockModel.create(newBlock);

    res.status(201).json({
      message: "Credential issued successfully",
      transaction: savedTx,
      block: savedBlock,
    });
  } catch (err) {
    console.error("Error issuing credential:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFullChain = async (req, res) => {
  try {
    const blocks = await BlockModel.find().populate("transactions");
    res.status(200).json(blocks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blockchain" });
  }
};
