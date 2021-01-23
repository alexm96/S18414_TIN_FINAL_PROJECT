const express = require('express')
const router = express.Router()
const user=require("../models/user")
const passport = require("passport");
router.get("/:id",(req,res)=>{ // retrieve some user details
    let newUser=new user.User("hello","a@b","alex","martynek")
    res.send(JSON.stringify( newUser))
})
router.patch("/upgrade",passport.authenticate("jwt", { session: false }),(req,res,next)=>{

})
module.exports = router