const express = require('express')
const router = express.Router()
const {registerStudent, getAllStudents} = require('../controllers/registerStudent')

router.post('/registerStudent', registerStudent)
router.get('/students', getAllStudents)


module.exports = router