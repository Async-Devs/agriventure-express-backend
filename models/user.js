const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  profilePicture: {
    type: String,
    required: true,
    default: "https://res.cloudinary.com/drh02pftv/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1668790540/profilePictures/default_gerxri.jpg"
  }
})

exports.User = mongoose.model('User', userSchema)
