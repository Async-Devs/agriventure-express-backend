const {Buyer} = require('../models/buyer');
const express = require('express');
const {User} = require("../models/user");
const router = express.Router();

router.get('/',async (req, res) => {
    const buyerList = await Buyer.find().populate('login');
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

router.delete('/deleteById/:id', (req,res)=>{
    Buyer.findByIdAndRemove(req.params.id).then(buyer => {
        if(buyer){
            return res.status(200).json({
                success: true,
                message: 'the buyer was deleted'
            });
        }else{
            return res.status(404).json({
                success: false, message: "buyer not found"
            });
        }
    }).catch(err => {
        return res.status(400).json({
            success: false, error: err
        });
    });
});

router.put('/updateMyProfile',async (req,res)=>{
    console.log(req.body.id);
    const buyer = await Buyer.findByIdAndUpdate(
        req.body.id,
        {
            email: req.body.email,
            telNum: req.body.telNum,
            address: req.body.address
        },{new: true})
    if(!buyer){
        return res.status(404).send({message: 'The buyer can not be updated', success: false});
    }
    res.send({
        success: true,
        producer: buyer
    });
});


module.exports = router;