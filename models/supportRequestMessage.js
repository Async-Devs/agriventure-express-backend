const mongoose = require('mongoose');

const supportRequestMessageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportRequest',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

exports.SupportRequestMessage = mongoose.model('SupportRequestMessage',supportRequestMessageSchema)