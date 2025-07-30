const express = require("express");
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user")

app.post('/signup',async(req,res)=>{
  //creating a new instance of the userModel
const user= new User({
  firstName:"Anjali",
  lastName:"kumari",
  emailId:"anjali@gmail.com",
  password:"anjali987"
 })
  try{
    await user.save();
  res.send("User added successfully")
  }catch(err){
    send.status(400).send("error saving the user:",error.message)
  }

});


connectDB()
.then(() => {
        console.log("Database is Connected successfully");

        app.listen(3000, () => {
          console.log("Server is running on port 3000");
        })
    })


    .catch((err )=> {
        console.error("Failed to connect database");
    });



