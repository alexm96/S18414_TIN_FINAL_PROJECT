const express = require('express')
const router = express.Router()
const user=require("../models/user")
router.get("/:id",(req,res)=>{
    let newUser=new user.User("hello","a@b","alex","martynek")
    
    res.send(JSON.stringify( newUser))
})
module.exports = router