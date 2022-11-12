const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Districts',
    required: true
  },
  city: {
    type: String,
    required: true
  }
})

exports.Location = mongoose.model('Location', locationSchema)
