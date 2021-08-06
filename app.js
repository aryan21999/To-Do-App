const http = require('http');
const express = require('express')
const db = require('./db/mongoose')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')
const path = require('path')
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


const User = require('./routers/user')

var token = jwt.sign({ _id:  '610ce2d8981d3065240daea8' }, 'thisismynewproject', {
    expiresIn: '1 seconds'
  });

jwt.verify(token, 'thisismynewproject', function(err, token) {
  })


const port = process.env.port || 4000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

module.exports = app