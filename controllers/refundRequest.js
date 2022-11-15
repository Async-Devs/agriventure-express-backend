const { RefundRequest } = require('../models/refundRequest')
const { Order } = require('../models/Order')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userId = userToken.userId

    const order = await Order.findById(req.body.orderId)
    if (!order) {
      return res.status(500).json({
        success: false,
        msg: 'Order not found!'
      })
    }

    if (order.buyer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        msg: 'Invalid User!'
      })
    }

    let refundRequest = new RefundRequest({
      orderId: req.body.orderId,
      buyerId: userId,
      refundValue: req.body.refundValue,
      description: req.body.description,
      messages: [],
      date: Date.now(),
      lastActiveDate: Date.now()
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
  } catch (error) {
    res.status(403).json({
      success: false,
      msg: 'Invalid token'
    })
  }
}

const getRefundRequestByOrderId = async (req, res) => {
  const orderId = req.params.id
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userId = userToken.userId

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(500).json({
        success: false,
        msg: 'Order not found!'
      })
    }

    if (order.buyer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        msg: 'Invalid User!'
      })
    }

    const refundRequest = await RefundRequest.findOne({ orderId: mongoose.Types.ObjectId(orderId) }).populate('orderId').populate('buyerId')
    if (!refundRequest) {
      return res.status(500).json({
        success: true,
        isFound: false
      })
    }

    res.send({
      refundRequest,
      success: true,
      isFound: true
    })
  } catch (error) {
    res.status(403).json({
      success: false,
      msg: 'Invalid token'
    })
  }
}

module.exports = {
  getAllRefundRequests,
  getRefundRequestById,
  addRefundRequest,
  getRefundRequestByOrderId
}
