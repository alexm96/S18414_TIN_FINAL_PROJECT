
function User(someCreateResponse) {
    this.email = someCreateResponse["email"];
    this.firstName = someCreateResponse["first_name"];
    this.lastName=someCreateResponse["last_name"]
    this.password=someCreateResponse["password"]
    this.location=new location(someCreateResponse["address_line1"],someCreateResponse["address_line2"],someCreateResponse["country"],someCreateResponse["city"],someCreateResponse["postal_code"])



}
function location(address_line1,address_line2,country,city,postal_code){
  this.address_line1=address_line1;
  this.address_line2=address_line2;
  this.postal_code=postal_code;
  this.country=country;
  this.city=city;
}
exports.User=User;