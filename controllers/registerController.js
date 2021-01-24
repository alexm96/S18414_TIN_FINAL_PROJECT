const mysql = require("mysql2/promise");
const mysqlConnection = require("../secrets.json").mysqlConnection;
const hashPass = require("../utils/hasher").hashPassword;
const user = require("../models/user").User;
const nodeEmoji = require("node-emoji");
const generateId = require("../utils/nanoid").generateId;

exports.registerUser = async (req, res) => {
  let newUser = new user(req.body);
  const connection = await mysql.createConnection(mysqlConnection);

  const valueOFExists = await checkEmail(newUser.email);
  const newId = await generateId();
  const createdAndUpdatedAt = new Date(new Date().toUTCString());
  if (!valueOFExists) {
    const newPass = await hashPass(newUser.password);
    let query = `insert into user (id,first_name,last_name,email,phonenumber,address_line1,address_line2,country,postal_code,password,city,tier_id,created_at,updated_at) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    connection.query(
      query,
      [
        newId,
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.phonenumber,
        newUser.location.address_line1,
        newUser.location.address_line2,
        newUser.location.country,
        newUser.location.postal_code,
        newPass,
        newUser.location.city,
        1,
        createdAndUpdatedAt,
        createdAndUpdatedAt
        
      ]
    ).then(([row,field])=>{

      res.send(
        `Sign up successful, congrats! Please login now ${nodeEmoji.get(
          "muscle"
        )}`.toString());
        
    }).catch((err)=>{
      console.log(err)
      res.send(
        `Signup failed${nodeEmoji.get(
          "frowning"
        )}`.toString());
    }).finally(()=>{
      connection.close();
    })
  }
    
   else {
    connection.end().then(()=>{
        console.log("con closed")
    });
    res.send(`${newUser.email} already in system`);
  }
};

const checkEmail = async (emailToCheck) => {
  const connection = await mysql.createConnection(mysqlConnection);
  let query = `select count(1) as existing from user where email=?`;
  const [rows, fields] = await connection.query(query, [emailToCheck]);
  return rows[0].existing > 0;
};
exports.checkEmail=checkEmail