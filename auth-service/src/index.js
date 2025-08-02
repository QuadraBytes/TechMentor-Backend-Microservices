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

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 5001, () => {
            console.log("Auth Service is running on port", process.env.PORT || 5001);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
