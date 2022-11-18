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
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Districts',
  },
  officerType: {
    type: Number,
    required: true
  }
})

exports.Officer = mongoose.model('Officer', officerSchema)
