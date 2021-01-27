const express = require("express");
const router = express.Router();
const Image = require("../models/image").Image;
const Advertisement = require("../models/advertisement").Advertisement;
const passport = require("passport");
const bodyparser = require("body-parser");
const formData = require("form-data");
const Message= require("../models/message").message;
const getAvailableAdvertisements = require("../controllers/advertisementController")
  .getAvailableAdvertisements;
const getApplicableAdvertisements = require("../controllers/advertisementController")
  .getAdvertisements;
const deleteAd = require("../controllers/advertisementController")
    .deleteAdvertisement;
const getUserApplicableAdvertisements = require("../controllers/advertisementController")
    .getUserAdvertisements;
const nodeEmoji = require("node-emoji");
const uploadFile = require("../utils/multerStorage");
const {
  createAdvertisement,
} = require("../controllers/advertisementController");
const checkCanMakeAd = async (req, res, next) => {
  const canMakePost = await getAvailableAdvertisements(req, res);
  if (canMakePost) {
    next();
  } else {
    res.status(429).send({
      message: `You have posted too many ads this month ${nodeEmoji.get(
        "frowning"
      )}`,
    });
  }
};
const createAdvert = async (req, res) => {
  const newAdvert = new Advertisement(req.body);

  const newImage = new Image(req);
  const result = await createAdvertisement(newAdvert, req.user._id, newImage);
  console.log(result);
  if (!!result) {
    res.json({ message: `Ad created! ${nodeEmoji.get("heart_eyes")} Redirecting you home now` });
  } else {
    res.json({
      message: `Something went wrong on our end ${nodeEmoji.get(
        "sob"
      )} Please try again!`,
    });
  }
};

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploadFile.single("image"),
  checkCanMakeAd,
  createAdvert
);
router.use(bodyparser.json());
router.get("/", async (req, res, next) => {
  // no auth needed for now , returns miniAds (Title,price, picture)

  const searchTerm = req.query.term;
  const city = req.query.city;
  const pageNumber=req.query.pNum;
  const pageSize=req.query.pSize;
  const ads = await getApplicableAdvertisements(searchTerm, city,pageNumber,pageSize);
  res.send(ads);
});
router.get("/userPosts",passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  // no auth needed for now , returns miniAds (Title,price, picture)

  const userId=req.user["_id"]
  const ads = await getUserApplicableAdvertisements(userId);
  console.log("ads")
  res.send(ads);
});

router.delete("/:adId",passport.authenticate("jwt",{session:false}),async (req,res,next)=>{
  const userId=req.user["_id"]
  console.log(req.params)
  const adId=req.params.adId;
  console.log(userId,adId)
  if(!!userId&&!!adId){
    const messageToUser=await deleteAd(userId,adId)
    res.send(messageToUser)
  }
  else{
    res.send(new Message("Please login and provide a valid advertisement id"))
  }



})
module.exports = router;
