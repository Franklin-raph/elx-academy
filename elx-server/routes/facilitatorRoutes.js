const express = require('express')
const router = express.Router()
const {registerFacilitator, getAllFacilitators} = require('../controllers/facilitatorController')

router.post('/registerFacilitator', registerFacilitator)
router.get('/facilitators', getAllFacilitators)


module.exports = router