const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const task = require('../models/task')
const db = require('../db/mongoose')

const userOne = {
    name: 'Aryan',
    email: 'test12@test.com',
    password: 'asdf0987'
}

beforeAll(async () => {
    await User.deleteMany()
})

var token, user

test('Signup a new User', async () => {
    await request(app).post('/register').send({
        name: userOne.name,
        email: userOne.email,
        password: userOne.password
    })
    .expect((res) => {(res.body.user)})
    .expect(201)
})

test('Login User', async () => {
    const response = await request(app).post('/register/login').send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
    .expect((res) => {token = res.body.token, user = res.body.user})
})

const taskOne = {
    description: 'Complete Project.',
    completed: false
 }
 
 const taskTwo = {
    description: 'Project Completed.',
    completed: true
 }
 
 var id
 

 test('Create Task', async () => {
    const response = await request(app)
    .post('/add')
    .set('Authorization', `Bearer ${token}`)
    .send({
        description: taskOne.description,
        completed: taskOne.completed
    })
    .expect((res) => {id = res.body._id})
    .expect(201)
})

 
test('Read all Task', async () => {
    const response = await request(app).get('/list')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    expect(response.body[0].name).toEqual(taskOne.name)
})

test('Update Task', async () => {
     const response = await request(app).patch(`/read/${id}`)
     .set('Authorization', `Bearer ${token}`)
     .send({
        description: taskTwo.description,
        completed: taskTwo.completed
    })
    .expect(200)
    expect(response.body.description).toEqual(taskTwo.description)
    expect(response.body.completed).toEqual(taskTwo.completed)
})

// delete task
test('Delete Task', async () => {
    const response = await request(app)
    .delete(`/read/${id}/delete`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);
})

 test('Logout existing user', async () => {
    await request(app)
    .post('/register/logout')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
})