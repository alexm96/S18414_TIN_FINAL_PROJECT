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
const tag=require("./routes/tags")
const advertisement=require("./routes/advertisement")
app.use("/users",users)
app.use("/register",register)
app.use("/login",login)
app.use("/tags",tag)
app.use("/advertisement",advertisement)
app.get('/', (req, res) => {
  console.log("hello world")
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})