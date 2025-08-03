require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

const authRouter = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRouter);

async function main() {
  await prisma.$connect();
  console.log("Connected to PostgreSQL Database");

  app.listen(process.env.PORT || 5001, () => {
    console.log("Auth Service is running on port", process.env.PORT || 5001);
  });
}

main().catch((err) => {
  console.error("PostgreSQL connection error:", err);
});