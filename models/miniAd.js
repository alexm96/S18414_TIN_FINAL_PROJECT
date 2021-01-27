function MiniAd(row,imageFromDb){
    this.id=row["id"]
    this.title=row["title"]
    this.price=row["price"]
    this.postedAt=row["created_at"]
    this.image=imageFromDb

}
exports.MiniAd=MiniAd