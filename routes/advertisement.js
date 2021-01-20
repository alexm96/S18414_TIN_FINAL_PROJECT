const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
const passport = require("passport");
router.use(bodyparser.json())
const customCallback= async (req,res,next)=>{
    console.log(req.header["jwt"])
    console.log(req.body)
    res.json("ok")
}
router.post('/', passport.authenticate('jwt', { session: false }),customCallback
);
module.exports = router