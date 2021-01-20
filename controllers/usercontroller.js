const mysql = require("mysql2/promise");
const mysqlConnection = require("../secrets.json").mysqlConnection;
// get specific user
// post user (register)

exports.get_specific_user=async (email)=>{
    const connection = await mysql.createConnection(mysqlConnection)
    const [rows,fields]=await connection.query("Select * from user where email = ?",[email]).catch((error)=>{console.log(error); return [undefined,undefined]})
    const userRow=rows[0]

    if(userRow){
        return userRow["id"]
    }
    else{
        return undefined
    }
}