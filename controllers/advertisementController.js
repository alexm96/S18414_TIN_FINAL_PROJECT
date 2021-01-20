const mysql = require("mysql2/promise");
const mysqlConnection = require("../secrets.json").mysqlConnection;
const getSpecificUser = require("./usercontroller").get_specific_user
exports.createAdvertisement=async(req,res)=>{

}
exports.updateAdvertisement=async(req,res)=>{

}
exports.deleteAdvertisement=async(req,res)=>{

}
exports.getAdvertisement=async (req,res)=>{

}
exports.getAvailableAdvertisements=async(req,res)=>{
    // will fire after authentication so no need to use jwt
    const connection = await mysql.createConnection(mysqlConnection)
    try {

        const uid=req.user._id

        const [rows,fields]=await connection.query(
            'select can_post from user_monthly_post_limits where user_id=?',
            [uid]);

        return rows[0]["can_post"];

}catch (error){
        console.log(error)
        return false
    }finally { connection.close()
    }}