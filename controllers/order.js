const { Order } = require('../models/Order')
const mongoose = require('mongoose')

const getOrdersByBuyerId = async(req, res) => {
    const buyerId = req.params.id
    const orderArray = await Order.find({ buyer: buyerId }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

const getOrdersByProducerId = async(req, res) => {
    const producerId = req.params.id
    const orderArray = await Order.find({ producer: producerId }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

const getOrderById = async(req, res) => {
    const orderId = req.params.id
    const orderDetails = await Order.find({ _id: orderId }).populate('item').populate('buyer').populate('producer').populate('messages');
    return res.send(orderDetails)
  };
const updateOrderDeliveryStatus = async(req, res) => {
      let result = null;
      try {
        const orderId = req.params.id
        const orderUpdatedStatus = req.body.status
        if (orderUpdatedStatus == 'DELIVERED') {
          result = await Order.findOneAndUpdate({ _id: orderId }, {
            delivery_status: orderUpdatedStatus,
            order_status: 'COMPLETE'
          })
        } else {
          result = await Order.findOneAndUpdate({ _id: orderId }, {
            delivery_status: orderUpdatedStatus,
            order_status: 'ACTIVE'
          })
        }
      }catch (e){
        result = "Error";
      }
        return  res.send(result);
	};

const setOrderPayment = async (req, res)=>{
  console.log( req.body.data);
  const updateData = req.body.data
  const db = await mongoose.connection;
  const session = await db.startSession();
  try {
    await session.startTransaction();
    const isValidPayment = true; // Payment gateway here
    if(!isValidPayment){
      await session.abortTransaction();
      return res.status(200).send({error: true, text: "Payment not Valid"});
    }
    
    await Order.findByIdAndUpdate(updateData.orderId,
      {
        order_delivery_address: updateData.orderUpdate.order_delivery_address,
        order_delivery_city: updateData.orderUpdate.order_delivery_city,
        order_delivery_zipcode: updateData.orderUpdate.order_delivery_zipcode,
        payment_status:"PAID"
      },{session});
    await session.commitTransaction();
    
  }catch (e){
    console.log(e);
    console.log("Order Payment Error")
    await session.abortTransaction();
    return res.status(200).send({error: true, text: "Error occurred"});
  }
  
  return res.status(200).send({error: false, text: "Success"});
}

module.exports = {
  getOrdersByBuyerId,
  getOrdersByProducerId,
  getOrderById,
  updateOrderDeliveryStatus,
  setOrderPayment
}
