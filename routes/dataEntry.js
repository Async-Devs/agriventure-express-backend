const {DataEntry} = require("../models/dataEntry");
const express = require("express");
// const {Location} = require("../models/location");
const router = express.Router();

router.get('/', async (req,res)=>{
    const dataEntryList = await DataEntry.find().populate("cropType").populate("location");
    if(!dataEntryList){
        return res.status(500).json({success: false});
    }
    res.send(dataEntryList);

})
router.post('/',async(req,res)=>{

    let dataEntry = new DataEntry({
        location: req.body.location,
        cropType: req.body.cropType,
        cropAmount: req.body.cropAmount,
        year: req.body.year,
    });

    dataEntry = await dataEntry.save();
    if(!dataEntry){
        return res.status(500).json({
            success: false
        });
    }
    res.send({
        dataEntry: dataEntry,
        success: true
    });

});