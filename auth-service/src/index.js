require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//     res.json({ msg: "Auth Service running" });
// });

app.use("/", authRouter);

try {
  console.log("Connected to ProsgresSQL Database");
  app.listen(process.env.PORT || 5001, () => {
    console.log("Auth Service is running on port", process.env.PORT || 5001);
  });
} catch (error) {
  console.error("PostgreSQL connection error:", err);
}
    