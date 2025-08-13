const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpdate } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //validator
    validateSignUpdate(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encryption
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new instance of the userModel
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790",{
        expiresIn:"15d",
      });

      //Add the token to Cookie and send the response back to user
      res.cookie("token", token);

      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

app.post("/sendConnectionRequest",userAuth, (req,res)=>{
  const user=req.user;
  console.log("sending Connection");

  res.send(user.firstName + "'s connection request!")
  
})

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
