const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
router.use(bodyparser.json())

router.get("/",async (req,res)=>{ // create new user (register)
    const tags=["sample1","sample2"]
    res.json(tags)
})
module.exports = router