const mongoose = require('mongoose')

const refundRequestSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  producerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refundValue: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  isSendToOfficer: {
    type: Boolean,
    required: true,
    default: false
  },
  isProducerRead: {
    type: Boolean,
    required: true,
    default: false
  },
  isBuyerRead: {
    type: Boolean,
    required: true,
    default: true
  },
  isOfficerRead: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  lastActiveDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  description: {
    type: String,
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RefundRequestMessage'
  }]
})

exports.RefundRequest = mongoose.model('RefundRequest', refundRequestSchema)
