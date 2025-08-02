require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const courseRoutes = require("./routes/course.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "Course Service is running" });
});

app.use("/api/v1/course", courseRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(process.env.PORT || 5002, () => {
            console.log("🚀 Course Service is running on port", process.env.PORT || 5002);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });
