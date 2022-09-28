const mongoose = require("mongoose");

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
    }
});

exports.User = mongoose.model("User",userSchema);