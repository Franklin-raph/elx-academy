const Facilitator = require('../models/facilitaorModel')

const registerFacilitator = (req, res) => {
    const {firstName, lastName, email, learningTrack} = req.body
    try {
        if(!firstName || !lastName || !email || !learningTrack){
            res.status(400).json({msg:"Please Fill in all fields"})
            return
        }else{
            // creating the user
            const facilitator = new Facilitator({
                firstName, lastName, email, learningTrack
            })
            facilitator.save()
            res.status(201).json(facilitator)
        }
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

const getAllFacilitators = async (req, res) => {
    try {
        const facilitator = await Facilitator.find().sort({createdAt: -1})
        res.status(200).json(facilitator)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    registerFacilitator,
    getAllFacilitators
}