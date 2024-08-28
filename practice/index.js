const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
require("./config/dbCon");
const userRoute = require("./routes/user");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", userRoute);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  //clientBriefMessageCronJob.start();
});
