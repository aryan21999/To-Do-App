const http = require('http');
const express = require('express')
const db = require('./db/mongoose')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')
const path = require('path')
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.static(__dirname + '././public'));
const publicDirectoryPath = path.join(__dirname, '/views/')

app.set("view engine", "ejs");

app.get('/', function (req, res, next) {
  res.render(`${publicDirectoryPath}signin`)
})

app.get('/index', function (req, res, next) {
  res.render(`${publicDirectoryPath}index`)
})

app.get('/signup', function (req, res, next) {
  res.render(`${publicDirectoryPath}signup`)
})

app.use(express.static(publicDirectoryPath))


app.use(express.json())
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
app.use(express.static("public"));


// // app.get('/', function (req, res, next) {
// //   res.sendFile(path.join(__dirname+ '/views/signin.ejs'))
// // })

// app.use(express.static(__dirname))

// app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


const User = require('./routers/user')

var token = jwt.sign({ _id:  '610ce2d8981d3065240daea8' }, 'thisismynewproject', {
    expiresIn: '1 seconds'
  });

jwt.verify(token, 'thisismynewproject', function(err, token) {
  })


const port = process.env.Port || 3000

app.listen(port, () => {
    console.log('Server is running on ' + port)
})

module.exports = app