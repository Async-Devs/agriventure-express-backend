const { RefundRequest } = require('../models/refundRequest')
const { Order } = require('../models/Order')
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {SupportRequest} = require("../models/supportRequest");

const getAllRefundRequests = async (req, res) => {
  const refundRequestList = await RefundRequest.find().populate('orderId')
  if (refundRequestList) {
    res.status(500).json({ success: false })
  }
  res.send(refundRequestList)
}

const getRefundRequestById = async (req, res) => {
  const refundRequest = await RefundRequest.findById(req.params.id).populate('orderId')
  if (!refundRequest) {
    res.status(500).json({
      success: false
    })
  }
  res.send({
    refundRequest,
    success: true
  })
}

const addRefundRequest = async (req, res) => {
  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userId = userToken.userId;

    const order = await Order.findById(req.body.orderId);
    if(!order){
      return res.status(500).json({
        success: false,
        msg: "Order not found!"
      })
    }

    if(order.buyer.toString() !== userId){
      return res.status(403).json({
        success: false,
        msg: "Invalid User!"
      })
    }


    let refundRequest = new RefundRequest({
      orderId: req.body.orderId,
      buyerId: userId,
      producerId: req.body.producerId,
      refundValue: req.body.refundValue,
      description: req.body.description,
      messages: [],
      date: Date.now(),
      lastActiveDate: Date.now()
    })

    refundRequest = await refundRequest.save()
    if (!refundRequest) {
      return res.status(500).json({
        success: false
      })
    }
    res.send({
      refundRequest,
      success: true
    })

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }

}

const getRefundRequestByOrderId = async (req, res) => {
  const orderId = req.params.id;
  try {
    const userToken = await jwt.verify(req.header("x-auth-token"), process.env.ACCESS_TOKEN_SECRET);
    const userId = userToken.userId;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(500).json({
        success: false,
        msg: "Order not found!"
      })
    }

    if (order.buyer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        msg: "Invalid User!"
      })
    }

    const refundRequest = await RefundRequest.findOne({orderId: mongoose.Types.ObjectId(orderId)}).populate("orderId").populate("buyerId").populate("messages").populate("producerId");
    if (!refundRequest) {
      res.send({
        success: true,
        isFound: false
      })
      return
    }

    res.send({
      refundRequest,
      success: true,
      isFound: true
    })

  } catch (error) {
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }
}

const updateRefundRequest = async (req,res) => {

  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userType = userToken.userType;

    const refundRequest = await RefundRequest.findByIdAndUpdate(req.body.id,
        {
          messages: req.body.messages,
          lastActiveDate: Date.now(),
          isProducerRead: userType === 0,
          isBuyerRead: userType === 1
        },{new: true});
    if(!refundRequest){
      return res.status(404).send({ message: 'The refund request can not be updated', success: false })
    }
    res.send({
      success: true,
      refundRequest
    })

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }

}


const withdrawRefundRequest = async (req,res) => {

  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userType = userToken.userType;

    if(userType === 1){
      const request = await RefundRequest.findById(req.body.id);

      if(!request){
        return res.status(500).json({
          success: false,
          msg: "Request not found!"
        })
      }

      if(request.buyerId.toString() !== userToken.userId){
        return res.status(443).json({
          success: false,
          msg: "Invalid User!"
        });
      }

      const refundRequest = await RefundRequest.findByIdAndUpdate(req.body.id,
          {
            isActive: false,
          },{new: true});
      if(!refundRequest){
        return res.status(404).send({ message: 'The refund request can not be updated', success: false })
      }
      res.send({
        success: true,
        refundRequest
      })
    }else{
      res.send({
        success: false,
        msg: "invalid userType"
      });
    }


  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }

}

const getMyRefundRequests = async (req,res) => {
  console.log("routing done");
  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userId = userToken.userId;

    const refundRequest = await RefundRequest.find({producerId: mongoose.Types.ObjectId(userId)}).populate("producerId").populate("messages").sort({lastActiveDate: -1}).populate("buyerId").populate("orderId");

    if(!refundRequest){{}
      res.status(500).json({
        success: false,
        message: 'Refund Requests not found'
      })
    }
    res.send({
      refundRequest,
      success: true
    });

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }
}

const openRefundRequest = async (req,res) => {

  try{
    const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
    const userType = userToken.userType;

    const form = userType ===0 ? {isProducerRead: true} : {isBuyerRead: true};
    const refundRequest = await RefundRequest.findByIdAndUpdate(req.body.id,
        form,{new: true});
    if(!refundRequest){
      return res.status(404).send({ message: 'The refund request can not be updated', success: false })
    }
    res.send({
      success: true,
      refundRequest: refundRequest
    })

  }catch (error){
    res.status(403).json({
      success: false,
      msg: "Invalid token"
    });
  }

}





module.exports = {
  getAllRefundRequests,
  getRefundRequestById,
  addRefundRequest,
  getRefundRequestByOrderId,
  updateRefundRequest,
  withdrawRefundRequest,
  getMyRefundRequests,
  openRefundRequest
}
