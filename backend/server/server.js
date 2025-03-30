// server/server.js
const express = require("express");
const connectDB = require("../config/db");
const app = express();

// Middleware
app.use(express.json());

// Connect to Mongo
connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Edu Ledger backend running on port ${PORT} 🚀`);
});
