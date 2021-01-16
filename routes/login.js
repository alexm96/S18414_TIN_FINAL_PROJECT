const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
const loginUser=require("../controllers/loginController")
router.use(bodyparser.json())
router.post("/",async (req,res)=>{ // create new user (register)
    
    loginUser.loginUser(req,res)
})
module.exports = router