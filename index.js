const express = require("express");
// require("dotenv").config();
const userRoute = require("./routes/userRoute");
const app = express();
// const multer = require("multer");
const cors = require("cors");
app.use(cors());
// const mongoose = require("mongoose");
const connectDB = require("./database/connection");
// const ObjectId = require("mongodb").ObjectId;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8005;

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("hellodd");
});

app.listen(PORT, async () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
  await connectDB();
});
