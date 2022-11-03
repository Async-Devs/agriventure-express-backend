const express = require('express')
const router = express.Router()
const officerController = require('../controllers/officer')

router.get('/', officerController.getAllOfficers)
router.post('/', officerController.addNewOfficer)
router.put('/updateProfile', officerController.updateOfficer)

module.exports = router
