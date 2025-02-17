const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.patch("/profile/edit", userAuth,async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("INVALID EDIT REQUEST !!");
    }
    const loggedInUser = req.user;

   Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);
 
   await loggedInUser.save();


    res.json({message : `${loggedInUser.firstName} Profile Updatyed succesfullyt`,
      data:loggedInUser
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("USER DOESNT NOT EXISTS");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: SOMETHING WENT WRONG " + err.message);
  }
});

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
  try{
  const user = req.user;
  const { currentPassword,password } = req.body;
  const x  = await bcrypt.compare(currentPassword,user.password);
  if(x == false)
   throw new Error("Wrong Current Password");
  const passwordHash = await bcrypt.hash(password, 10);
  user.password = passwordHash;
  await user.save();
  res.send("PASSWORD IS UPDATED SUCESFULLY !!!")
}
catch(err){
   res.status(400).send("ERROR:"+err.message);
}

})

module.exports = profileRouter;
