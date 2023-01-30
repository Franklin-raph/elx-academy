const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    learningTrack: {
        type: String
    }
},{timeStapms: true})

module.exports = mongoose.model('StudentRegisterModel', StudentSchema)