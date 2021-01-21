function MiniAd(row,imageFromDb){
    this.title=row["title"]
    this.price=row["price"]
    this.image=imageFromDb
}
exports.MiniAd=MiniAd