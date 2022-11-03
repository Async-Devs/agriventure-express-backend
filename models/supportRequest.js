const mongoose = require('mongoose')

const supportRequestSchema = mongoose.Schema({
  producerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producer',
    required: true
  },
  type: {
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

exports.SupportRequest = mongoose.model('SupportRequest', supportRequestSchema)
