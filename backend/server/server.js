const express = require("express");
const connectDB = require("../config/db");
const ledgerRoutes = require("./routes/ledger");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/ledger", ledgerRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Edu Ledger backend running on port ${PORT} 🚀`);
});
