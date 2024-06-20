const express = require('express')
const app = express()
const {connectDb, getConnection} = require('./database/database.js')
const users = require('./routes/users.js');
const cookieParser = require('cookie-parser');
const port = 3000


connectDb();

app.use(express.json())
app.use(cookieParser())

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('entry point')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})