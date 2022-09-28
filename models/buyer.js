const mongoose = require('mongoose');

const buyerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telNum: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    login: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

exports.Buyer = mongoose.model('Buyer', buyerSchema);