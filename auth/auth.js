const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const loginUser=require("../controllers/loginController")
const mysql = require("mysql2/promise");
const mysqlConnection = require("../secrets.json").mysqlConnection;
const comparePassword = require("../utils/hasher").comparePassword;
const nodeEmoji=require("node-emoji")
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
                        return done(null, false, { message: 'Wrong Password' });
                    }
                    else{
                        const userToReturn={"id":userRow.id,"email":userRow.email}
                        return done(null, userToReturn, { message: `Login successful ${nodeEmoji.get(
                                "muscle"
                            )}`.toString()});
                    }
            }
                else{
                    return done(null, false, { message: 'User not found' });
                }
            }catch (error) {
                console.log(error)
                return done(error);
        }}
    )
);
module.exports = function(passport){}