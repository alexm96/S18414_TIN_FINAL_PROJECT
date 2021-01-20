const express = require('express')
const router = express.Router()

const passport = require("passport");
const multer = require("multer")
const getAvailableAdvertisements = require("../controllers/advertisementController").getAvailableAdvertisements
const  upload = multer({ dest: 'upload/'})
const getUpload=upload.single("image")
const nodeEmoji = require("node-emoji");
const checkCanMakeAd= (async (req,res,next)=>{
        const canMakePost=await getAvailableAdvertisements(req,res)
        if(canMakePost){
            next()
        }
        else{
            res.sendStatus(429).send({"message":`You have posted too many ads this month ${nodeEmoji.get("frowning")}`})
        }
})
const customCallback= (async (req,res,next)=>{
    console.log(req.file)
    console.log(req.body)
    res.json("ok")
})

router.post('/', passport.authenticate('jwt', { session: false }),getUpload,checkCanMakeAd,customCallback
);
module.exports = router