// body,sender,receiver, time
const mongoose = require('mongoose')

const chatMessageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

exports.ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)
