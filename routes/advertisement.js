const express = require('express')
const router = express.Router()
const Image = require("../models/image").Image
const Advertisement=require("../models/advertisement").Advertisement
const passport = require("passport");
const bodyparser=require("body-parser");
const getAvailableAdvertisements = require("../controllers/advertisementController").getAvailableAdvertisements
const getApplicableAdvertisements = require("../controllers/advertisementController").getAdvertisements
const nodeEmoji = require("node-emoji");
const uploadFile = require("../utils/multerStorage");
const {createAdvertisement} = require("../controllers/advertisementController");
const checkCanMakeAd= (async (req,res,next)=>{
        const canMakePost=await getAvailableAdvertisements(req,res)
        if(canMakePost){
            next()
        }
        else{
            res.status(429).send({"message":`You have posted too many ads this month ${nodeEmoji.get("frowning")}`})
        }
})
const createAdvert= (async (req,res)=>{
    const newAdvert=new Advertisement(req.body)
    console.log(newAdvert)
    const newImage=new Image(req)
    const result=createAdvertisement(newAdvert,req.user._id,newImage)
    if(result){
        res.json({"message":"success"})
    }
})

router.post('/', passport.authenticate('jwt', { session: false }),uploadFile.single("image"),checkCanMakeAd,createAdvert
);
router.use(bodyparser.json())
router.get('/',async (req,res,next)=>{
    // no auth needed for now , returns miniAds (Title,price, picture)
    const searchTerm=req.query.term
    const city=req.query.city
    const ads=await getApplicableAdvertisements(searchTerm,city)
    console.log(ads)
    res.send("ok")

})
router.post('/:id',(req,res,next)=>{
    // no auth needed, returns full add when loading page
})
module.exports = router