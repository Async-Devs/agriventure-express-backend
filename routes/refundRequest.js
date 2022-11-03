const express = require('express')
const router = express.Router()
const refundRequestController = require('../controllers/refundRequest')

router.get('/', refundRequestController.getAllRefundRequests)
router.get('/:id', refundRequestController.getRefundRequestById)
router.post('/', refundRequestController.addRefundRequest)
