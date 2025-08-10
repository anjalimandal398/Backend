const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpdate}=require("./utils/validation")
const bcrypt=require("bcrypt")

app.use(express.json());

app.post("/signup", async (req, res) => {

  try {
//validator
validateSignUpdate(req)

const{firstName,lastName,emailId,password}=req.body;

//Encryption
const passwordHash=await bcrypt.hash(password,10);
console.log(passwordHash);



  //creating a new instance of the userModel
  const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash

  });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid email or password")
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
   if(isPasswordValid){
    res.send("Login Successful!!")
   }
   else{
    throw new Error("Invalid email or password")
   }

  }
  catch (err) {
    res.status(400).send("ERROR: "+ err.message);   
   }

});



//find user by email
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



//deleteMethod/user
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    // const user= await User.findByIdAndDelete({_Id:userId})     //or
    const user= await User.findByIdAndDelete(userId)

    res.send("User deleted successfully")

  }catch (err) {
    res.status(400).send("Something went wrong..");   
   }
})



//updateMethod
app.patch("/user/:userId",async(req,res)=>{
  const userId =req.params?.userId;
  const data=req.body;

  try{
    const ALLOWED_UPDATES=[
      "photoUrl","about","gender","age","skills","password"
    ];
    const isUpdateAllowed=Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
  );
  if(!isUpdateAllowed){
    throw new Error("Update not allowed");
  }
  if(data?.skills?.length>20){
    throw new Error("More than 20 skills is not allowed ")
  }

    const user=await User.findByIdAndUpdate({_id: userId},data ,{
      returnDocument:"after",
      runValidators:true,
    })

    console.log(user);
    res.send("User updated successfully")

  }catch (err) {
    res.status(400).send("UPDATE FAILED:"+ err.message);   
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
