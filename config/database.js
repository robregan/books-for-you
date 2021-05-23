const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://rob:rob@cluster0.umujo.mongodb.net/social-network?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;