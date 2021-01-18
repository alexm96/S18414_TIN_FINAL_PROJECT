const express = require('express')
const passport=require("passport")
const cors=require("cors")
const helmet =require("helmet")
const app = express()
app.use(cors())
app.use(helmet())
app.use(passport.initialize({}));
require('./auth/auth')(passport);
const port = 3000
const users=require("./routes/user")
const register=require("./routes/register")
const login=require("./routes/login")
app.use("/users",users)
app.use("/register",register)
app.use("/login",login)
app.get('/', (req, res) => {
  console.log("hello world")
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})