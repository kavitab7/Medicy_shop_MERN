const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    location: {
        type: String,

    },
    answer: {
        type: String,

    },
    role: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)
