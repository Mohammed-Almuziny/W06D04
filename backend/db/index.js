const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_URI).then(
  () => {
    console.log("mongodb connect successfully");
  },
  (err) => {
    console.log(err);
  }
);
