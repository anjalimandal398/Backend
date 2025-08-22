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

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    if (!oldPassword || !newPassword) {
      throw new Error("Both oldPassword and newPassword are required");
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      throw new Error("Email and newPassword are required");
    }

    const User = require("../models/user"); 
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with this email");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


module.exports = profileRouter;
