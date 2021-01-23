const express = require('express')
const router = express.Router()
const bodyparser=require("body-parser")
const loginUser=require("../controllers/loginController")
const passport=require("passport")
const jwt = require('jsonwebtoken');
const secret=require("../secrets.json")["my-secret-key"]

router.use(bodyparser.json())

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
                 return res.status(403).send(info)
             }

             req.login(
                 user,
                 {session: false},
                 async (error) => {
                    if (error) return next(error);

                    const token = jwt.sign({_id: user.id, email: user.email}, secret,{ expiresIn: '8h' });
                    res.set("JWT",token);

                    return res.json({...info});
                 }
             );
          } catch (error) {
             return next(error);
          }
       }
   )(req, res, next);
});


module.exports = router