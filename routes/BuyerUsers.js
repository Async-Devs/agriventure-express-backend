const router = require('express').Router()
const refundRequestController = require('../controllers/refundRequest')
const refundRequestMessageController = require('../controllers/refundRequestMessage')

router.post('/addRefundRequest', refundRequestController.addRefundRequest)
router.post('/addRefundRequestMessage', refundRequestMessageController.addRefundRequestMessage)

router.get('/refundRequestForOrder/:id', refundRequestController.getRefundRequestByOrderId)

router.put('/addRefundRequestMessage', refundRequestController.updateRefundRequest)
router.put('/withdrawRefundRequest', refundRequestController.withdrawRefundRequest)
module.exports = router
