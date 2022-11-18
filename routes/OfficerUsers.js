const router = require('express').Router()
const producerController = require('../controllers/producer')
const dataEntryController = require('../controllers/dataEntry')
const { DistrictController } = require('../controllers/districts')
const userController = require('../controllers/user')

router.get('/getAllProducers', producerController.getAllProducers)
router.get('/getByUserId', producerController.getUserById)
router.get('/getUserById/:id', userController.getUserById)
router.get('/getAllDistricts', DistrictController.getAllDistricts)

router.put('/updateDataEntry', dataEntryController.updateDataEntry)
router.put('/updateProfile', userController.editProfile)
router.put('/approveUser', userController.approveUser)

router.delete('/deleteById/:id/:userId', producerController.deleteById)
router.delete('/deleteDataById/:id', dataEntryController.deleteDataById)

router.post('/addProducer', producerController.addNewProducer)
router.post('/addUser', userController.addUser)
router.post('/addDataEntry', dataEntryController.addDataEntry)

module.exports = router
