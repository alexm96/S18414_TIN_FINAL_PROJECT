const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mysql = require("mysql2/promise");
const mysqlConnection = require("../secrets.json").mysqlConnection;
const mySecret=require("../secrets.json")["my-secret-key"]
const comparePassword = require("../utils/hasher").comparePassword;
const nodeEmoji=require("node-emoji")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts={}
opts.jwtFromRequest = ExtractJwt.fromHeader("jwt")
opts.secretOrKey = mySecret
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {

            const connection = await mysql.createConnection(mysqlConnection);
            try {
                const [rows,fields]=await connection.query(
                    'SELECT id,email,password FROM `user` WHERE `email` = ? ',
                    [email],(err,res)=>{
                        if(err){
                            throw new Error(err); // seems to not work within callback, have to await and use elsewhere
                        }
                    }
                );
                userRow=rows[0]
                if(userRow){
                    const passwordsMatch=await comparePassword(userRow.password,password)
                    if(!passwordsMatch){
                        return done(null, false, { message: `Wrong Password ${nodeEmoji.get("frowning")}` });
                    }
                    else{
                        const userToReturn={"id":userRow.id,"email":userRow.email}
                        return done(null, userToReturn, { message: `Login successful ${nodeEmoji.get(
                                "muscle"
                            )} Redirecting you now!`.toString()});
                    }
            }
                else{
                    return done(null, false, { message: 'User not found' });
                }
            }catch (error) {

                return done(error);
        }}
    )
);
passport.use('jwt',new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload);
}));
module.exports = function(passport){}