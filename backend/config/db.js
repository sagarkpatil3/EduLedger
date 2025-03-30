const mongoose = require("mongoose");
require("dotenv").config();
let MONGO_URI =
  "mongodb+srv://sagarkp3:sagarkp3@cluster0.blszgit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
