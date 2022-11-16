const mongoose = require('mongoose')

const officerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  login: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  officerType: {
    type: Number,
    required: true
  }
})

exports.Officer = mongoose.model('Officer', officerSchema)
