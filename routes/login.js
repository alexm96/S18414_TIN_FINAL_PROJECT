const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
const loginUser=require("../controllers/loginController")
const passport=require("passport")
const jwt = require('jsonwebtoken');
const secret=require("../secrets.json")["my-secret-key"]
const test=require("../controllers/userController").get_specific_user
router.use(bodyparser.json())
const customCallback=(req,res,next)=>{

}
router.post("/",async (req,res,next)=> { // create new user (register)
   passport.authenticate(
       'login',
       async (err, user, info) => {
          try {
             if (err ) {
                const error = new Error('An error occurred.');

                return next(error);
             }
             else if (!user){
                 return res.json(info)
             }

             req.login(
                 user,
                 {session: false},
                 async (error) => {
                    if (error) return next(error);
                    const body = {_id: user.id, email: user.email};
                    const token = jwt.sign({user: body}, secret,{ expiresIn: '30m' });
                    res.set("JWT",token)
                    return res.json({...info});
                 }
             );
          } catch (error) {
             return next(error);
          }
       }
   )(req, res, next);
});
router.get('/test', passport.authenticate('jwt', { session: false }),customCallback
);

module.exports = router