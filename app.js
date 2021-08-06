const http = require('http');
const express = require('express')
const db = require('./db/mongoose')
const userRouter = require('./routes/user')
const path = require('path')

const app = express();

app.use(express.json())
app.use(userRouter)

const port = process.env.port || 4000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

module.exports = app