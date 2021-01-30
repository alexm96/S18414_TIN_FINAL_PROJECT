const mysql = require("mysql2/promise");
const mysqlConnection = require("../secrets.json").mysqlConnection;
// get specific user
// post user (register)

exports.getSpecificUser = async (id) => {
  const connection = await mysql.createConnection(mysqlConnection);

  try {
    const [
      rows,
      fields,
    ] = await connection.query(
      "Select first_name,last_name,email,address_line1,address_line2,country,postal_code,city,phonenumber,is_admin from user where id=?",
      [id]
    );

    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    connection.end().then((r) => console.log("ended connection"));
  }
};
exports.updateSpecificUser = async (userObject) => {
  const connection = await mysql.createConnection(mysqlConnection);

  try {
    const [
      rows,
      fields,
    ] = await connection.query(
      "update user set first_name=?,last_name=?,email=?,address_line1=?,address_line2=?,country=?,postal_code=?,city=?,phonenumber=?,updated_at=?  where id=?",
      [
        userObject.firstName,
        userObject.lastName,
        userObject.email,
        userObject.addressLine1,
        userObject.addressLine2,
        userObject.country,
        userObject.postalCode,
        userObject.city,
        userObject.phoneNumber,
          new Date(new Date().toUTCString()),
        userObject.id,
      ]
    );

    return rows.affectedRows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end().then((r) => console.log("ended connection"));
  }
};
