const router = require('express').Router()
const producerController = require('../controllers/producer')
const dataEntryController = require('../controllers/dataEntry')
const { DistrictController } = require('../controllers/districts')

router.get('/', dataEntryController.getAllDataEntry)
router.post('/', dataEntryController.addDataEntry)
router.put('/', dataEntryController.updateDataEntry)
router.delete('/:id', dataEntryController.deleteDataById)

router.get('/', producerController.getAllProducers)
router.post('/', producerController.addNewProducer)
router.get('/getByUserId', producerController.getUserById)
router.delete('/deleteById/:id/:userId', producerController.deleteById)

router.get('/', DistrictController.getAllDistricts)

module.exports = router
