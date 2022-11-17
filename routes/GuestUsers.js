const router = require('express').Router()
const dataEntryController = require('../controllers/dataEntry')
const { DistrictController } = require('../controllers/districts')
const districtController = require('../controllers/district')
const producerController = require('../controllers/producer')
const buyerController = require('../controllers/buyer')

router.get('/getAllDataEntry', dataEntryController.getAllDataEntry)
router.get('/getDistrictById/:id', DistrictController.getDistrictById)
router.get('/getAllLocations', districtController.getAllDistrict)

router.get('/cropDetails', dataEntryController.getCropDetails)
router.get('/districtDetails', dataEntryController.getDistrictDetails)

router.get('/noOfProducers', producerController.getNoOfProducers)
router.get('/noOfBuyers',buyerController.getNoOfBuyers)

module.exports = router
