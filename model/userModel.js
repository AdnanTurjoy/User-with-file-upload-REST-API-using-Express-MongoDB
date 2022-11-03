const mongoose = require("mongoose");
const multer = require("multer");

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
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

module.exports = { User, upload };
