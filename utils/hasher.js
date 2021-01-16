const bcrypt=require("bcrypt")
const hashkey=require("../secrets.json")["my-secret-key"]
const saltRounds=10
exports.hashpassword=async (passwordToHash)=>{return await bcrypt.hash(passwordToHash, saltRounds)}