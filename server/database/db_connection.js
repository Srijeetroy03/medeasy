const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, connectionParams).then(() => {
      console.log("Connected to DB 🌐");
    });
  } catch (e) {
    console.log("Connection UnSuccessful.");
    console.log(e);
  }
};
