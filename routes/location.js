const {Location} = require('../models/location');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) =>{
    const locationList = await Location.find();
    if(!locationList){
        res.status(500).json({success: false});
    }
    res.send(locationList);
});

router.post('/', async (req,res) =>{
    let location = new Location({
        name: req.body.name
    });

    location = await location.save();
    if(!location){
        return res.status(500).json({
            success: false
        });
    }
    res.send(location);
} )