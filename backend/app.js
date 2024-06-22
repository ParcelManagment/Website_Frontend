require('dotenv').config();
const express = require('express')
const app = express()
const {connectDb, getConnection} = require('./database/database.js')
const users = require('./routes/users.js');
const staff = require('./routes/station_staff.js');
const cookieParser = require('cookie-parser');
const port = 3001


// development code segment (allow http request with localhost:3001 )
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
/// end development code segment

connectDb();

app.use(express.json())
app.use(cookieParser())

app.use('/users', users);
app.use('/staff', staff);

app.get('/', (req, res) => {
  res.send('entry point')
})
app.get('/login', (req, res) => {
  res.send('This is login')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})