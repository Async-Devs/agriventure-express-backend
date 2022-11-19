const { Order } = require('../models/Order')

const getAllOrders = async(req, res) => {
    console.log('fetching All Orders')
    const orderArray = await Order.find().populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

const getAllActiveOrders = async(req, res) => {
    console.log('fetching All Orders')
    const orderArray = await Order.find({ order_status: 'ACTIVE' }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

const getOrdersByBuyerId = async(req, res) => {
    const buyerId = req.params.id
    console.log('get orders for buyer', buyerId)
    const orderArray = await Order.find({ buyer: buyerId }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

const getOrdersByProducerId = async(req, res) => {
    const producerId = req.params.id
    console.log('get orders for producer', producerId)
    const orderArray = await Order.find({ producer: producerId }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

const getOrderById = async(req, res) => {
    const orderId = req.params.id
    console.log('get order Id - ', orderId)
    const orderDetails = await Order.find({ _id: orderId }).populate('item').populate('buyer').populate('producer').populate('messages');
    console.log('get order - ', orderDetails)
    return res.send(orderDetails)
  };
const updateOrderDeliveryStatus = async(req, res) => {
      let result = null;
      try {
        const orderId = req.params.id
        const orderUpdatedStatus = req.body.status
        console.log('update DeliveryStatus order Id - ', orderId, orderUpdatedStatus)
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
 
module.exports = {
  getAllOrders,
  getAllActiveOrders,
  getOrdersByBuyerId,
  getOrdersByProducerId,
  getOrderById,
  updateOrderDeliveryStatus
}
