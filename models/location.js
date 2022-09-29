const mongoose = require('mongoose');
const stream = require("stream");

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});



exports.Location = mongoose.model('Location',locationSchema);