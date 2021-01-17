const {nanoid}= require("nanoid")
exports.generateId=async()=>{
    return  nanoid();
}