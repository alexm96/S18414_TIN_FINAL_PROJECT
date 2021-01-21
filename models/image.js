const path = require("path");
function Image(rawReq) {
  this.name = rawReq.file.originalname;
  this.type = rawReq.file.mimetype;
  this.data = path.join(__dirname, "../", "upload/" + rawReq.file.filename);
}
function ImageFromDB(row) {
  this.name = row["name"];
  this.type = row["type"];
  this.blobData = row["data"];
}
exports.Image = Image;
exports.ImageFromDb = ImageFromDB;
