const path=require("path")
const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
const fs=require("fs")
router.use(bodyparser.json())
const options = {
    root: path.join(__dirname, "../", "upload/"),
    dotfiles: 'deny'
};



router.get("/",async (req,res,next)=>{
    //route for sending ad image
    const fileName=req.query.id;
    const filePath=path.join(options.root,fileName)
    fs.access(filePath,fs.F_OK,(err)=>{
        if(err){
            console.log(err)
            res.sendFile(path.join(options.root,"sample.jpg"))

        }
            else{
                res.sendFile(filePath)
        }

    })


})

module.exports = router