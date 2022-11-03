const { RefundRequest } = require('../models/refundRequest')
const { Order } = require('../models/Order')

const getAllRefundRequests = async (req, res) => {
  const refundRequestList = await RefundRequest.find().populate('orderId')
  if (refundRequestList) {
    res.status(500).json({ success: false })
  }
  res.send(refundRequestList)
}

const getRefundRequestById = async (req, res) => {
  const refundRequest = await RefundRequest.findById(req.params.id).populate('orderId')
  if (!refundRequest) {
    res.status(500).json({
      success: false
    })
  }
  res.send({
    refundRequest,
    success: true
  })
}

const addRefundRequest = async (req, res) => {
  const order = await Order.findById(req.body.orderId)
  if (!order) {
    return res.status(400).send('Invalid order')
  }

  let refundRequest = new RefundRequest({
    orderId: req.body.orderId,
    refundValue: req.body.refundValue,
    description: req.body.description,
    messages: req.body.messages
  })

  refundRequest = await refundRequest.save()
  if (!refundRequest) {
    return res.status(500).json({
      success: false
    })
  }
  res.send({
    refundRequest,
    success: true
  })
}

module.exports = {
  getAllRefundRequests,
  getRefundRequestById,
  addRefundRequest
}
