const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Mongo connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Simple route
app.get("/", (req, res) => {
  res.send("Re ulti topi wale re babu bhole bhale 🚀");
});

// Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});