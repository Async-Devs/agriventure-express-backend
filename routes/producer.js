const {Producer} = require('../models/producer');
const express = require('express');
const router = express.Router();

router.get('/',async (req, res) => {
    const producerList = await Producer.find();
    if(!producerList){
        res.status(500).json({success: false});
    }
    res.send(producerList);
});

router.post(`/`,async (req,res)=>{
    let producer = new Producer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        email: req.body.email,
        address: req.body.address
    });

    producer = await producer.save();
    if(!producer){
        return res.status(500).json({
            success: false
        });
    }
    res.send(producer);

});

module.exports = router;
