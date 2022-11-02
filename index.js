const express = require("express");
require("dotenv").config();
const app = express();
const multer = require("multer");
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8005;
const mongoAtlasUri = process.env.DB_URL;

// MongoDB Connect
const connectDB = async () => {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
};
// Schemas
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("users", userSchema); // automatic create a (User) collection(Table)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

// Read all User
app.get("/users", async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// Read Specific user
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const Users = await User.find(query);
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// Search a user by name or anything u want

app.get("/search/:key", async (req, res) => {
  try {
    const query = req.params.key;

    const Users = await User.find({
      $or: [{ name: { $regex: query } }],
    });
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const product = await User.findOne({ _id: req.params.id });
    if (product) {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "product is deleted",
      });
    } else {
      res.status(404).send({ message: "product is not found with this id" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
// Create Users
app.post("/adduser", upload.single("image"), async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename,
    });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
  //res.status(200).send("file is uploaded");
});

app.get("/adduser", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.get("/", (req, res) => {
  res.send("hellodd");
});

app.listen(PORT, async () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
  await connectDB();
});
