const bcrypt=require("bcrypt")
const saltRounds=require("../secrets.json").hashing["salt-rounds"]

exports.hashPassword=async (passwordToHash)=>{return await bcrypt.hash(passwordToHash, saltRounds)}
exports.comparePassword=async(originalPassword,givenPassword)=>{
    return await bcrypt.compare(givenPassword,originalPassword);
}