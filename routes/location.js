const express = require('express')
const router = express.Router()
const locationController = require('../controllers/location')

router.get('/', locationController.getAllLocations)
router.post('/', locationController.addLocation)

module.exports = router
