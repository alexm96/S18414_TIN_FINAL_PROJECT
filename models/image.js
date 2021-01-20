const fs=require("fs")
const path = require("path")
function Image(rawReq){
    this.name=rawReq.file.originalname
    this.type=rawReq.file.mimetype
    this.data=path.join(__dirname,"../","upload/"+rawReq.file.filename)
}
exports.Image=Image