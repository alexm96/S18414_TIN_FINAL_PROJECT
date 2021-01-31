const {UserFromDb} = require("./user");
const {User} = require("./user");
const {InLineUser} = require("./user");
const {ImageFromDb} = require("./image");

function Advertisement(someCreateResponse) {
    this.title=someCreateResponse["title"]
    this.category=someCreateResponse["category"]
    this.description=someCreateResponse["description"]
    this.price=someCreateResponse["price"]
}
function AdvertisementFromDb(dbRow) {
    this.title=dbRow["title"]
    this.category=dbRow["category"]
    this.description=dbRow["description"]
    this.price=dbRow["price"]
    this.city=dbRow["city"]
    this.postalCode=dbRow["postal_code"]
}
function FullPageAd(userRow,imageRow,adRow){
    this.user=new UserFromDb(userRow)
    this.advertisement=new AdvertisementFromDb(adRow)
    this.image=new ImageFromDb(imageRow)
}
exports.Advertisement=Advertisement
exports.FullPageAd=FullPageAd