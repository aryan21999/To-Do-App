const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required!",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: "Email is required!",
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Please enter a valid E-mail!");
            }
          },
    },
    password: {
        type: String,
        required: "Password is required!",
        validate(value) {
            if (!validator.isLength(value, { min: 6, max: 10 })) {
              throw Error("Length of the password should be between 6-10");
            }
    
            if (value.toLowerCase().includes("password")) {
              throw Error(
                'The password should not contain the keyword "password"!'
              );
            }
          },
        },
})

const User = mongoose.model('User', userSchema)

module.exports = User