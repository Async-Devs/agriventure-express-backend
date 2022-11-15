const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  name: {
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
    type: String,
    required: true
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
  bidding_array: {
    type: [{
      time_stamp: Date,
      bidder_name: String, // Change this to Ref of Buyer later: User Auth WIP
      bid_amount: Number
    }]
  },
  bid_end_time: {
    type: Date,
    required: true
  },
  state: {
    type: String,
    required: true,
    default: 'ACTIVE'		// ACTIVE, ENDED, REMOVED
  }
})

exports.Item = mongoose.model('Item', itemSchema)
