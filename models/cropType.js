const mongoose = require('mongoose')

const cropTypeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  }
})

exports.CropType = mongoose.model('CropType', cropTypeSchema)
