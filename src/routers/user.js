const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth"); // Destructure userAuth to ensure it's a function
const ConnectionRequest = require("../models/connectionRequest"); // Updated variable name to follow convention

//get all the pending connection req for the loggedInUser
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
       const loggedInUser=req.user;
       const connectionRequests=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested",
       }).populate("fromUserId",["firstName","lastName","age","gender","photoUrl","about"]);


       res.json({message:"Data fetched successfully",
        data:connectionRequests,
       })

    }
    catch(err){
        res.status(400).send(" ERROR " +err.message)
    }
})

module.exports = userRouter;