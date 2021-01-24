const express = require("express");
const router = express.Router();
const user = require("../models/user");
const passport = require("passport");
const bodyparser=require("body-parser")
const {updateSpecificUser} = require("../controllers/usercontroller");
const {getSpecificUser} = require("../controllers/usercontroller");
const nodeEmoji=require("node-emoji")
router.use(bodyparser.json())
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // retrieve some user details

     const userDetails = await getSpecificUser(req.user["_id"]);
     let newUser = new user.InLineUser(userDetails);
     res.send(JSON.stringify(newUser));
  }
);
router.patch(
    "/",
    passport.authenticate("jwt", { session: false },),
    async (req, res, next) => {

        const userDetails={...req.body,id:req.user["_id"]}
        console.log(userDetails)
        const updateResult=await updateSpecificUser(userDetails)
        if(updateResult===1){
            res.send( {"message":`Successfully changed your details ${nodeEmoji.get("japanese_goblin")}`})
        }
        else{
            res.send( {"message":"Fail!"})
        }
    }
);
router.patch(
  "/upgrade",
  passport.authenticate("jwt", { session: false },),
  (req, res, next) => {
      res.send({"message":"Nice!"})
  }
);
module.exports = router;