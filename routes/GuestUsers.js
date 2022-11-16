const router = require('express').Router()
const dataEntryController = require('../controllers/dataEntry')
const { DistrictController } = require('../controllers/districts')
const districtController = require('../controllers/district')

router.get('/getAllDataEntry', dataEntryController.getAllDataEntry)
router.get('/getDistrictById/:id', DistrictController.getDistrictById)
router.get('/getAllLocations',districtController.getAllDistrict)

module.exports = router
