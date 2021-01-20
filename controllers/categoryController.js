const mysql=require("mysql2/promise")
const mysqlConnection=require("../secrets.json").mysqlConnection
exports.getAvailableCategories= getAvailableCategories=async ()=>{
    const connection = await mysql.createConnection(mysqlConnection);
    try {
        const [rows, fields] = await connection.query("select name from tag")
        console.log(rows)
        const cleanedRows=rows.map((row)=>{
            return row["name"]
        })
        return cleanedRows
    }
    catch (error){
        return ["Other"]
    }
    }