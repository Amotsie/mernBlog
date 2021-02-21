const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("connected to DB");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
