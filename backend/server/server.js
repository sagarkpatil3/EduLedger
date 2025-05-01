const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const ledgerRoutes = require("./routes/ledger");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
