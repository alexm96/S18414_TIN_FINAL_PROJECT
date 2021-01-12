function User(username,email, firstName, lastName,address_line1,address_line2,country,city,postal_code) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName=lastName
    this.location=locationStuff(address_line1,address_line2,country,city,postal_code)
  }
function locationStuff(address_line1,address_line2,country,city,postal_code){
  this.address_line1=address_line1;
  this.address_line2=address_line2;
  this.postal_code=postal_code;
  this.country=country;
  this.city=city;
}
exports.User=User;