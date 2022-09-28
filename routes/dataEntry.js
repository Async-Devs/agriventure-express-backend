const {DataEntry} = require("../models/dataEntry");
const express = require("express");
const router = express.Router();

router.get('/', async (req,res)=>{
    const dataEntryList = await DataEntry.find().populate("cropType").populate("location").populate("producer");
    if(!dataEntryList){
        return res.status(500).json({success: false});
    }
    res.send(dataEntryList);

})