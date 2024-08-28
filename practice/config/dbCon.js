const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((error) => {
      console.log(`Error in database connection: ${error}`);
    });
};

module.exports = dbConnection();
