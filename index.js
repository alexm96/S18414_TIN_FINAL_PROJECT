const express = require('express')
const cors=require("cors")
const app = express()
app.use(cors())
const port = 3000
const users=require("./routes/user")

app.use("/users",users)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})