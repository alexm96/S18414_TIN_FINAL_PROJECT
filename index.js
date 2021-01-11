const express = require('express')
const app = express()
const port = 3000

const users=require("./routes/user")
app.use("/users",users)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})