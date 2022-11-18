const router = require('express').Router()
const producerController = require('../controllers/producer')
const dataEntryController = require('../controllers/dataEntry')
const { DistrictController } = require('../controllers/districts')
const userController = require('../controllers/user')
const supportRequestController = require('../controllers/supportRequest')
const refundRequestController = require('../controllers/refundRequest')
const supportRequestMessageController = require('../controllers/supportRequestMessage')

router.get("/myProfile",userController.getMyProfile);
router.get("/supportRequestByType/:type",supportRequestController.getSupportRequestByType)
router.get("/getRefundRequests",refundRequestController.getAllRefundRequests)
router.get('/getAllProducers', producerController.getAllProducers)
router.get('/getByUserId', producerController.getUserById)
router.get('/getUserById/:id', userController.getUserById)
router.get('/getAllDistricts', DistrictController.getAllDistricts)

router.put('/updateDataEntry', dataEntryController.updateDataEntry)
router.put('/updateProfile', userController.editProfile)
router.put('/approveUser', userController.approveUser)
router.put('/addSupportRequestMessage',supportRequestController.updateSupportRequest)
router.put('/closeSupportRequest',supportRequestController.closeSupportRequest)
router.put('/withdrawRefundRequest', refundRequestController.disableRequest)

router.delete('/deleteById/:id/:userId', producerController.deleteById)
router.delete('/deleteDataById/:id', dataEntryController.deleteDataById)


router.post('/addProducer', producerController.addNewProducer)
router.post('/addUser', userController.addUser)
router.post('/addDataEntry', dataEntryController.addDataEntry)
router.post('/addSupportRequestMessage',supportRequestMessageController.addSupportRequestMessage)

module.exports = router
