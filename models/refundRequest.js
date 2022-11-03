const mongoose = require('mongoose')

const refundRequestSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  refundValue: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatMessage'
  }]
})

exports.RefundRequest = mongoose.model('RefundRequest', refundRequestSchema)
