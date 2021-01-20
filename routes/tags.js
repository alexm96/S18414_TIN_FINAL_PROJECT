const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
const getCategories=require("../controllers/categoryController").getAvailableCategories
router.use(bodyparser.json())

router.get("/",async (req,res)=>{ // create new user (register)
    const tags= await getCategories();
    res.json(tags)
})
module.exports = router