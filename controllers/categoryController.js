const mysql=require("mysql2/promise")
const mysqlConnection=require("../secrets.json").mysqlConnection
exports.getAvailableCategories= getAvailableCategories=async ()=>{
    const connection = await mysql.createConnection(mysqlConnection);
    try {
        const [rows, fields] = await connection.query("select id,name from tag")

        return rows.map((row) => {
            return {"id":row["id"],"name":row["name"]}
        })
    }
    catch (error){
        return ["Other"]
    }
    }

