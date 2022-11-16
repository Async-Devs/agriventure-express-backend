const mongoose = require('mongoose')

const producerSchema = mongoose.Schema({
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
  telNum: {
    type: String,
    required: true
  },
  address: {
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
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

exports.Producer = mongoose.model('Producer', producerSchema)
