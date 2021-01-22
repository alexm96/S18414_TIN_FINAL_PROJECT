function MiniAd(row,imageFromDb){
    this.title=row["title"]
    this.price=row["price"]
    this.postedAt=row["created_at"]
    this.image=imageFromDb

}
exports.MiniAd=MiniAd