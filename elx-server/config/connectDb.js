const mongoose = require("mongoose");
require("dotenv").config();
const dbConnectionString =
  "mongodb+srv://franklin:emmaofmcap@elx-academy-students.9jg0zcr.mongodb.net/?retryWrites=true&w=majority";
console.log(dbConnectionString);
mongoose.set("strictQuery", true);

const dbConnectinMethod = async () => {
  console.log(dbConnectionString);
  try {
    await mongoose.connect(dbConnectionString);
    console.log("Db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { dbConnectinMethod };

// process.env.MONGO_REMOTE_URI;
