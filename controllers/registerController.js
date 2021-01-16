const mysql = require('mysql2/promise');
const mysqlConnection = require("../secrets.json").mysqlConnection;
const user = require("../models/user").User;
exports.registerUser = async (req, res) => {
  let newUser = new user(req.body);
  const connection = await mysql.createConnection(mysqlConnection);
  
  const valueOFExists=await checkEmail(newUser.email);
  if(!valueOFExists){
           console.log(valueExists)
            let query =
            "insert into sample_db.user (first_name,last_name,email,address_line1,address_line2,country,postal_code,password,city,tier_id) values(?,?,?,?,?,?,?,?,?,?)";
            connection.query(
            query,
            [
              newUser.firstName,
              newUser.lastName,
              newUser.email,
              newUser.location.address_line1,
              newUser.location.address_line2,
              newUser.location.country,
              newUser.location.postal_code,
              newUser.password,
              newUser.location.postal_code,
              1,
            ],
            (err, rows, fields) => {
              if (err) {
                console.log(`Error ${err}`);
              }
              
            }
          );
          connection.end();
          res.sendStatus(200);
   }
else{
    res.send(`${newUser.email} already in system`)
}}
        
    

      
    
  

const  checkEmail= async (emailToCheck)=>{
    const connection = await mysql.createConnection(mysqlConnection);
    let query =
      "select count(1) as existing from sample_db.user where email=?";
      const [rows,fields]=await 
       connection.query(
      query,
      [
        emailToCheck
      ]
      
    )
    return rows[0].existing>0
 
    
}