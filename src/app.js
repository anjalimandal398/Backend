const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating a new instance of the userModel
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    send.status(400).send("error saving the user:", error.message);
  }
});

//fine user bye email
app.post("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({emailId: userEmail});          //fineOne find only first one document 
    res.send(user);
    if(!user){
      res.status(404).send("user not found");
    }else{
      res.send(user);
    }
    // const users = await User.find({emailId: userEmail});           //find find all the document of the same emailId
    // if(users.length===0){
    //   res.status(404).send("user not found");
    // }else{
    //   res.send(users);
    // }

  } catch (err) {
   res.status(400).send("Something went wrong..");
   
  }
});

//Feed API-GET/Feed -get all the user from the database
app.get("/feed", async(req, res) => {
  try{
    const users= await User.find({})
    res.send(users)
  }catch (err) {
    res.status(400).send("Something went wrong..");   
   }
});

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
