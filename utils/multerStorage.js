const multer = require("multer");
const fs=require("fs")
const path=require("path")
const customStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,"../","upload/"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const uploadFile = multer({ storage: customStorage })
module.exports=uploadFile