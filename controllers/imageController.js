const mysql=require("mysql2/promise")
const fs=require("fs")
const mysqlConnection = require("../secrets.json").mysqlConnection
const uploadMyOwnImage= async (someImage)=>{
    const connection = await mysql.createConnection(mysqlConnection)
    const fileBlob=await fs.readFileSync(
        someImage.data
    )
    try {
        const [rows, fields] = await connection.query("insert into image (type,name,data) values(?,?,?)", [someImage.type, someImage.name, fileBlob])
        return rows.insertId
    }catch (error){
        return undefined
    }
    finally {
        connection.close()
    }

}
exports.uploadMyOwnImage=uploadMyOwnImage