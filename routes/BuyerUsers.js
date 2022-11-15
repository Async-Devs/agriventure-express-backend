const router = require('express').Router()
const refundRequestController = require('../controllers/refundRequest')

router.post('/addRefundRequest', refundRequestController.addRefundRequest)

router.get('/refundRequestForOrder/:id', refundRequestController.getRefundRequestByOrderId)

module.exports = router
