const express = require('express')
const bodyparser=require('body-parser')
const cors=require("cors")
const app = express()
app.use(cors())
const port = 3000
const users=require("./routes/user")
const register=require("./routes/register")
const login=require("./routes/login")
app.use("/users",users)
app.use("/register",register)
app.use("/login",login)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})