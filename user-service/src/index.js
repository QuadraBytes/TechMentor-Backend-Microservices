require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/student.routes");
const instructorRoutes = require("./routes/instructor.routes");

const app = express();
app.use(cors());
app.use(express.json());

// const { consumeCourseEnroll } = require("./utils/userConsumer");
// consumeCourseEnroll();


// app.get("/", (req, res) => {
//     res.json({ msg: "User Service is running" });
// });

app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 5003, () => {
            console.log("User Service is running on port", process.env.PORT || 5003);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
