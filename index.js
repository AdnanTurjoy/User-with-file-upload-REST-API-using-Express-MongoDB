const express = require("express");

const userRoute = require("./routes/userRoute");
const app = express();

const cors = require("cors");
app.use(cors());

const connectDB = require("./database/connection");

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
