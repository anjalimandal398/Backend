const express = require("express");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

    await loggedInUser.save();
   

    res.json({message: `${loggedInUser.firstName}, your profile updated successful..`,
    data: loggedInUser
  });
     
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
