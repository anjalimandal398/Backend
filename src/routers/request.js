const express=require("express")
const requestRouter=express.Router();
const { userAuth } = require("../middleware/auth");



requestRouter.post("/sendConnectionRequest",userAuth, (req,res)=>{
    const user=req.user;
    console.log("sending Connection");
  
    res.send(user.firstName + "'s connection request!")
    
  })

module.exports=requestRouter