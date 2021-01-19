const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
const registerUser=require("../controllers/registerController").registerUser
router.use(bodyparser.json())
router.post("/",async (req,res)=>{ // create new user (register)
    await registerUser(req,res)
})
module.exports = router