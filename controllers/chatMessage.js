const { ChatMessage } = require('../models/chatMessage')
const { User } = require('../models/user')
const jwt = require("jsonwebtoken");
const {SupportRequestMessage} = require("../models/supportRequestMessage");
const {Order} = require("../models/Order");
const {SupportRequest} = require("../models/supportRequest");

const addChatMessage = async (req, res) => {
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userId = userToken.userId

    // const order = await Order.findById(req.body.orderId);
    // if(order.producer.toString() !== userId && order.buyer.toString() !== userId){
    //   return res.status(403).json({
    //     success: false,
    //     msg: "unauthorized order id"
    //   })
    // }

    let message = new ChatMessage({
      senderId: userId,
      message: req.body.message,
      date: Date.now()
    })

    message = await message.save()
    if (!message) {
      return res.status(500).json({
        success: false
      })
    }

    res.send({
      message,
      success: true
    })

  } catch (error) {
    res.status(403).json({
      success: false,
      msg: 'Invalid token'
    })
  }
}

const updateOrder = async (req, res) => {
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userType = userToken.userType

    console.log(req.body.id);

    const order = await Order.findByIdAndUpdate(req.body.id,
        {
          messages: req.body.messages
        }, { new: true })
    if (!order) {
      return res.status(404).send({ message: 'The order can not be updated', success: false })
    }
    res.send({
      success: true,
      order
    })
  } catch (error) {
    res.status(403).json({
      success: false,
      msg: 'Invalid token'
    })
  }
}


module.exports = {
  addChatMessage,
  updateOrder
}
