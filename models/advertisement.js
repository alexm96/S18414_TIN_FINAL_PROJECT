function Advertisement(someCreateResponse) {
    this.title=someCreateResponse["title"]
    this.category=someCreateResponse["category"]
    this.description=someCreateResponse["description"]
    this.price=someCreateResponse["price"]
}
exports.Advertisement=Advertisement