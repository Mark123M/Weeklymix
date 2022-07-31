const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require('path');

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
    .then(res =>{
        console.log("connected to db")
    })

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

/*app.get('/',(req, res)=>{
    res.send("<h1>welcome to homepage</h1>")
}) */
/*
app.get('/users',(req, res)=>{
    res.send("<h1>welcome to users page</h1>")
}) */


/*app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../weeklymix_frontend/public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
}) */

app.listen(3001, ()=>{
    console.log('hello world')
})