const mongoose = require('mongoose')

const supportRequestSchema = mongoose.Schema({
  producerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  isProducerRead: {
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
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupportRequestMessage'
  }]
})

exports.SupportRequest = mongoose.model('SupportRequest', supportRequestSchema)
