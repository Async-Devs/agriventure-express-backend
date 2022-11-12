const mongoose = require('mongoose')

const dataEntrySchema = mongoose.Schema({
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
  city: {
    type: String,
    required: true
  },
  cropAmount: {
    type: String,
    required: true
  }
})

exports.DataEntry = mongoose.model('DataEntry', dataEntrySchema)
