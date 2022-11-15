const { SupportRequest } = require('../models/supportRequest')
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {SupportRequestMessage} = require("../models/supportRequestMessage");

const getAllSupportRequests = async (req, res) => {
  const supportRequestList = await SupportRequest.find().populate('producerId')
  if (supportRequestList) {
    res.status(500).json({ success: false })
  }
  res.send(supportRequestList)
}

const getSupportRequestById = async (req, res) => {
  const supportRequest = await SupportRequest.findById(req.params.id).populate('ProducerId')
  if (!supportRequest) {
    res.status(500).json({
      success: false
    })
  }
  res.send({
    supportRequest,
    success: true
  })
}

const addSupportRequest = async (req, res) => {
  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userId = userToken.userId;

    let supportRequest = new SupportRequest({
      producerId: userId,
      type: req.body.type,
      description: req.body.description,
      subject: req.body.subject,
      messages: [],
      date: Date.now(),
      lastActiveDate: Date.now()
    })

    supportRequest = await supportRequest.save()
    if (!supportRequest) {
      return res.status(500).json({
        success: false
      })
    }
    res.send({
      supportRequest,
      success: true
    })

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }

}

const openSupportRequest = async (req,res) => {

  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userType = userToken.userType;
    const form = userType ===0 ? {isProducerRead: true} : {isOfficerRead: true};
    const supportRequest = await SupportRequest.findByIdAndUpdate(req.body.id,
        form,{new: true});
    if(!supportRequest){
      return res.status(404).send({ message: 'The support request can not be updated', success: false })
    }
    res.send({
      success: true,
      supportRequest
    })

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }

}

const updateSupportRequest = async (req,res) => {

  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userType = userToken.userType;

    const supportRequest = await SupportRequest.findByIdAndUpdate(req.body.id,
        {
          messages: req.body.messages,
          lastActiveDate: Date.now(),
          isProducerRead: userType === 0,
          isOfficerRead: userType === 3
        },{new: true});
    if(!supportRequest){
      return res.status(404).send({ message: 'The support request can not be updated', success: false })
    }
    res.send({
      success: true,
      supportRequest
    })

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }

}

const getMySupportRequests = async (req,res) => {
  console.log("routing done");
  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userId = userToken.userId;

    const supportRequests = await SupportRequest.find({producerId: mongoose.Types.ObjectId(userId)}).populate("producerId").populate("messages").sort({lastActiveDate: -1});

    if(!supportRequests){{}
      res.status(500).json({
        success: false,
        message: 'Support Requests not found'
      })
    }
    res.send({
      supportRequests,
      success: true
    });

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }
}

module.exports = {
  getAllSupportRequests,
  getSupportRequestById,
  addSupportRequest,
  getMySupportRequests,
  updateSupportRequest,
  openSupportRequest
}
