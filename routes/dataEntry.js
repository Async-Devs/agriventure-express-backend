const {DataEntry} = require("../models/dataEntry");
const express = require("express");
const {CropType} = require("../models/cropType");
const {Producer} = require("../models/producer");
// const {Location} = require("../models/location");
const router = express.Router();

router.get('/', async (req,res)=>{
    const dataEntryList = await DataEntry.find().populate("cropType").populate("location");
    if(!dataEntryList){
        return res.status(500).json({success: false});
    }
    res.send(dataEntryList);

});
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

router.put('/',async (req,res)=>{
    console.log(req.body)
    const dataEntry = await DataEntry.findByIdAndUpdate(
        req.body.id,
        {
            cropType: req.body.cropType,
            cropAmount: req.body.cropAmount,
            location: req.body.location,
            year: req.body.year
        },{new: true})
    if(!dataEntry){
        return res.status(404).send({message: 'The Agriculture data can not be updated', success: false});
    }
    res.send({
        success: true,
        dataEntry: dataEntry
    });
});

router.delete('/deleteCropdata/', (req,res)=>{
    DataEntry.findByIdAndRemove(req.params.id).then(dataEntry => {
        if(dataEntry){
            return res.status(200).json({
                success: true,
                message: 'the agriculture data was deleted'
            });
        }else{
            return res.status(404).json({
                success: false, message: "agriculture data not found"
            });
        }
    }).catch(err => {
        return res.status(400).json({
            success: false, error: err
        });
    });
});

module.exports = router;