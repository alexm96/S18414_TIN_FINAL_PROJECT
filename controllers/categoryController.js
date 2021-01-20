const mysql=require("mysql2/promise")
const mysqlConnection=require("../secrets.json").mysqlConnection
exports.getAvailableCategories= getAvailableCategories=async ()=>{
    const connection = await mysql.createConnection(mysqlConnection);
    try {
        const [rows, fields] = await connection.query("select name from tag")

        return rows.map((row) => {
            return row["name"]
        })
    }
    catch (error){
        return ["Other"]
    }
    }
exports.getCategoryId= getCategoryId=async (categoryName)=>{
    const connection = await mysql.createConnection(mysqlConnection);
    try {
        const [rows, fields] = await connection.query("select id from tag where name=?",[categoryName])

        return rows.map((row) => {
            return row["id"]
        })
    }
    catch (error){
        return error
    }
}
