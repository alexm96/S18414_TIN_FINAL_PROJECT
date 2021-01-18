
// get specific user
// post user (register)

exports.get_specific_user=async (req,res,next)=>{
    if (req.user){
        console.log(req.user)
        res.send("success")
    }
}