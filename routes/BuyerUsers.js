const router = require('express').Router()
const refundRequestController = require('../controllers/refundRequest')
const refundRequestMessageController = require('../controllers/refundRequestMessage')
const ItemController = require('../controllers/item')

router.post('/addRefundRequest', refundRequestController.addRefundRequest)
router.post('/addRefundRequestMessage', refundRequestMessageController.addRefundRequestMessage)

router.get('/refundRequestForOrder/:id', refundRequestController.getRefundRequestByOrderId)

router.put('/addRefundRequestMessage', refundRequestController.updateRefundRequest)
router.put('/withdrawRefundRequest', refundRequestController.withdrawRefundRequest)
router.put('/sendRefundRequestToOfficer', refundRequestController.sendToOfficer)
router.put('/items/set-bid/:id', ItemController.setBidById)

module.exports = router
