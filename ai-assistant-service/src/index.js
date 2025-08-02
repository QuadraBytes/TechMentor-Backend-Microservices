require("dotenv").config();
const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "AI Assistant Service is running" });
});

app.use("/api/v1/ai", aiRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
    console.log(`🚀 AI Assistant Service running on port ${PORT}`);
});
