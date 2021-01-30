const getUser=require("../controllers/usercontroller").getSpecificUser
exports.checkIfAdmin=async (req,res,next)=>{
    //after jwt route
    const user=await getUser(req.user["_id"])

    if(user["is_admin"]===1){
        req.is_admin=true;
        next()
    }
    else{
        req.is_admin=false;
        next()
    }
}
