const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

exports.Location = mongoose.model('Location', locationSchema)
