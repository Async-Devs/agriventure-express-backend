//body,sender,receiver, time
const mongoose = require('mongoose');

const chatMessageSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

exports.ChatMessage = mongoose.model('ChatMessage',chatMessageSchema);