const http = require('http');
const express = require('express')
const Task = require('../models/task');
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/add', auth, async (req, res) => {
    const task = new Task({
        description: req.body.description,
        completed: req.body.completed,
        owner: req.user.email
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.get('/list', auth, async (req,res) => {
    try{
        const allTask = await Task.find()
        res.status(200).send(allTask)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/read/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user.email })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/read/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.email})
        // if(task.owner == req.user.email){
        //     updates.forEach((update) => task[update] = req.body[update])
        //     await task.save()
        // }
        // else if(task.owner != req.user.email){
        //     return res.status(400).send(e)
        // }
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/read/:id/delete', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.email })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router