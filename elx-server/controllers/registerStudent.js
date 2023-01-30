const Student = require('../models/StudentRegisterModel')

const registerStudent = (req, res) => {
    const {firstName, lastName, email, learningTrack} = req.body
    try {
        if(!firstName || !lastName || !email || !learningTrack){
            res.status(400).json({msg:"Please Fill in all fields"})
            return
        }else{
            // creating the user
            const user = new Student({
                firstName, lastName, email, learningTrack
            })
            user.save()
            res.status(201).json(user)
        }
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({createdAt: -1})
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    registerStudent,
    getAllStudents
}