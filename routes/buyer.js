const {Buyer} = require('../models/buyer');
const express = require('express');
const {User} = require("../models/user");
const router = express.Router();

router.get('/',async (req, res) => {
    const buyerList = await Buyer.find().populate('login')
    if(!buyerList){
        res.status(500).json({success: false});
    }
    res.send({
        buyerList: buyerList,
        success: true
    });
});

router.get('/getByUserId',async (req,res)=>{
    const buyer = await Buyer.findOne({login: req.query.login}).populate('login');
    if(!buyer){
        res.status(500).json({
            success: false
        });
    }
    res.send({
        buyer: buyer,
        success: true
    });
});

router.post(`/`,async (req,res)=>{

    const login = await User.findById(req.body.login);
    if(!login){
        return res.status(400).send('Invalid user')
    }

    let buyer = new Buyer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        email: req.body.email,
        address: req.body.address,
        telNum: req.body.telNum,
        login: req.body.login,
    });

    buyer = await buyer.save();
    if(!buyer){
        return res.status(500).json({
            success: false
        });
    }
    res.send({
        buyer: buyer,
        success: true
    });

});

module.exports = router;