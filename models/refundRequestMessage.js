const mongoose = require('mongoose')

const refundRequestMessageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RefundRequest',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }

})

exports.RefundRequestMessage = mongoose.model('RefundRequestMessage', refundRequestMessageSchema)
