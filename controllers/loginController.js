const mysql = require("mysql2/promise");
const mysqlConnection = require("../secrets.json").mysqlConnection;
const comparePassword = require("../utils/hasher").comparePassword;
const user = require("../models/user").User;
const nodeEmoji = require("node-emoji");
exports.loginUser = async (req, res) => {
    const connection = await mysql.createConnection(mysqlConnection);
    try {
        
    
  const email = req.body.email;
  const password = req.body.password;
  
  const [rows,fields]=await connection.query(
    'SELECT password FROM `user` WHERE `email` = ? ',
    [email],(err,res)=>{
        if(err){
            throw new Error(err); // seems to not work within callback, have to await and use elsewhere
        }
    }
  );
      userRow=rows[0]
      if(userRow){
          console.log()
        const passwordsMatch=await comparePassword(userRow.password,password)
        console.log(passwordsMatch)
        if(passwordsMatch){
            res.send("success")
        }
        else{
            res.send("fail")
        }
          
      }
   else{
       res.send("User doesn't exist")
   }
} catch (error) {
        console.log(error)
}
finally{
    connection.close()
}
 
 
};
