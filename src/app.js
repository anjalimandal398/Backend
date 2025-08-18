const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routers/auth")
const profileRouter=require("./routers/profile")
const requestRouter=require("./routers/request")


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)


connectDB()
  .then(() => {
    console.log("Database is Connected successfully");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })

  .catch((err) => {
    console.error("Failed to connect database");
  });
