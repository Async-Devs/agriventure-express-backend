const mongoose = require("mongoose");

const dataEntrySchema = mongoose.Schema({
    year: {
        type: String,
        required: true

    },
    cropType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CropType',
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer'
    }
});

exports.DataEntry = mongoose.model('DataEntry',dataEntrySchema);