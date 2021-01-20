function Advertisement(someCreateResponse) {
    this.email = someCreateResponse["email"];
    this.firstName = someCreateResponse["first_name"];
    this.lastName=someCreateResponse["last_name"]
    this.password=someCreateResponse["password"]
    this.phonenumber=someCreateResponse["phonenumber"]
    this.location=new location(someCreateResponse["address_line1"],someCreateResponse["address_line2"],someCreateResponse["country"],someCreateResponse["city"],someCreateResponse["postal_code"])



}

exports.Advertisement=Advertisement;