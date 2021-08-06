const http = require('http');
const express = require('express')
const User = require('../models/User')
const router = new express.Router()

router.post('/register', async (req, res) => {
    // console.log('jdncjnd')
    const user = new User(req.body)
    try {
        console.log(req.body.name)
        console.log(user)
        await user.save()
        res.status(201).send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/register/login', async (req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    res.send(user)
  }
  catch (error) {
      res.status(400).send(error)
  }
})

module.exports = router 