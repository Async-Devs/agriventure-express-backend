const {Producer} = require('../models/producer');
const express = require('express');
const {Location} = require("../models/location");
const {User} = require("../models/user");
const {CropType} = require("../models/cropType");
const router = express.Router();

router.get('/',async (req, res) => {
    const producerList = await Producer.find().populate('location').populate('login').populate('cropTypes');;
    if(!producerList){
        res.status(500).json({success: false});
    }
    res.send(producerList);
});

router.post(`/`,async (req,res)=>{

    const location = await Location.findById(req.body.location);
    if(!location){
        return res.status(400).send('Invalid location')
    }

    const login = await User.findById(req.body.login);
    if(!login){
        return res.status(400).send('Invalid user')
    }

    let producer = new Producer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        email: req.body.email,
        address: req.body.address,
        telNum: req.body.telNum,
        login: req.body.login,
        cropTypes: req.body.cropTypes,
        location: req.body.location
    });

    producer = await producer.save();
    if(!producer){
        return res.status(500).json({
            success: false
        });
    }
    res.send({
        producer: producer,
        success: true
    });

});

router.put('/updateMyProfile',async (req,res)=>{
    const location = await Location.findById(req.body.location);
    if(!location){
        return res.status(400).send('Invalid location '+ req.body.location);
    }
    for(let i = 0; i < req.body.cropTypes.length; i++){
        const cropType = await CropType.findById(req.body.cropTypes[i]);
        if(!cropType){
            return res.status(400).send('Invalid crop type '+ req.body.cropTypes[i]);
        }
    }

    const producer = await Producer.findByIdAndUpdate(
        req.body.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            telNum: req.body.telNum,
            address: req.body.address,
            cropTypes: req.body.cropTypes
        },{new: true})
    if(!producer){
        return res.status(404).send({message: 'The producer can not be updated', success: false});
    }
    res.send({
        success: true,
        producer: producer
    });
});

router.get('/getByUserId',async (req,res)=>{
    const producer = await Producer.findOne({login: req.query.login}).populate('location').populate('cropTypes').populate('login');
    if(!producer){
        res.status(500).json({
            success: false
        });
    }
    res.send({
        producer: producer,
        success: true
    });
});

module.exports = router;