const mongoose = require('mongoose')

const districtDataSchema = mongoose.Schema({
  year: {
    type: String,
    required: true

  },
  cropType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CropType',
    required: true
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Districts',
    required: true
  },
  totalCropAmount: {
    type: String,
    required: true
  }
})

exports.DistrictData = mongoose.model('DistrictData', districtDataSchema)
