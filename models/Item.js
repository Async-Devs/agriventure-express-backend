const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  crop: {
    type: String,
    required: true
  },
  images: {
    type: [{
      src: String
    }],
    required: true
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  location: {
    type: {
      latitude: String,
      longitude: String,
      city: String,
      district: String
    },
    required: true
  },
  minimum_bid: {
    type: Number,
    default: 0
  },
  minimum_bid_step: {
    type: Number,
    default: 0
  },
  bidding_array: {
    type: [{
      time_stamp: Date,
      bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      bid_amount: Number
    }],
    default: []
  },
  bid_end_time: {
    type: Date,
    required: true
  },
  state: {
    type: String,
    required: true,
    default: 'ACTIVE'		// ACTIVE, ENDED, REMOVED
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

exports.Item = mongoose.model('Item', itemSchema)
