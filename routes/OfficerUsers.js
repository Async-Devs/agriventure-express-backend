const router = require('express').Router()
const producerController = require('../controllers/producer')
const dataEntryController = require('../controllers/dataEntry')
const { DistrictController } = require('../controllers/districts')

router.get('/getAllDataEntry', dataEntryController.getAllDataEntry)
router.post('/addDataEntry', dataEntryController.addDataEntry)
router.put('/updateDataEntry', dataEntryController.updateDataEntry)
router.delete('/deleteDataById/:id', dataEntryController.deleteDataById)

router.get('/getAllProducers', producerController.getAllProducers)
router.post('/addNewProducer', producerController.addNewProducer)
router.get('/getByUserId', producerController.getUserById)
router.delete('/deleteById/:id/:userId', producerController.deleteById)

router.get('/getAllDistricts', DistrictController.getAllDistricts)

module.exports = router
