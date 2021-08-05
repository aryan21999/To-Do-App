const express = require('express')
const db = require('./db/mongoose')
const port = process.env.port || 4000

const app = express();

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

module.exports = app