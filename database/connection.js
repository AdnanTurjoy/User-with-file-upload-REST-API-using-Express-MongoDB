const mongoose = require("mongoose");

require("dotenv").config();

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

module.exports = connectDB;
