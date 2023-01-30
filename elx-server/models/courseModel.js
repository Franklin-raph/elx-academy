const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    stack: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
},{timeStapms: true})

module.exports = mongoose.model('Course', CourseSchema)