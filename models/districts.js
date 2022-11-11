const mongoose = require('mongoose')

const districtSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cities: {
    type: Array,
    required: true
  }
})

exports.Districts = mongoose.model('Districts', districtSchema)
