const {User} = require('../models/user');
const express = require('express');
const {Producer} = require("../models/producer");
const {Buyer} = require("../models/buyer");
const router = express.Router();
const mongoose = require('mongoose');

router.get('/',async (req, res) => {
    const userList = await User.find();
    if(!userList){
        res.status(500).json({success: false});
    }
    res.send(userList);
});

router.get('/getUserNames',async (req, res) => {
    const userList = await User.find().select("userName");
    if(!userList){
        res.status(500).json({success: false});
    }
    res.send(userList);
});

router.get('/getById', async (req,res) =>{
    const user = await User.findById(req.query.id);
    if(!user){
        res.status(500).json({success: false, message: "user not found!"})
    }
    if(user.userType === 0){
        const producer = await Producer.findOne({login: mongoose.Types.ObjectId(req.query.id) }).populate('location').populate('cropTypes').populate('login');
        if(!producer){
            res.status(500).json({
                success: false,
                message: "Producer not found"
            });
        }

        res.send(
            {
                user: user,
                typeDetails: producer,
                success: true
            }
        )
    }else if(user.userType === 1){
        const buyer = await Buyer.findOne({login: mongoose.Types.ObjectId(req.query.id) }).populate('login');
        if(!buyer){
            res.status(500).json({
                success: false,
                message: "Buyer not found"
            });
        }
        res.send(
            {
                user: user,
                typeDetails: buyer,
                success: true
            }
        )
    }

    res.send(
        {
            user: user,
            success: true
        }
    )
})

router.post(`/`,async (req,res)=>{
    let user = new User({
        userName: req.body.userName,
        password: req.body.password,
        userType: req.body.userType,
        isActive: req.body.isActive
    });

    user = await user.save();
    if(!user){
        return res.status(500).json({
            success: false
        });
    }
    res.send({
        user: user,
        success: true
    });

});

module.exports = router;