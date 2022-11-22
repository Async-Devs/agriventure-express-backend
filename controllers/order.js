const { Order } = require('../models/Order')

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
 
module.exports = {
  getOrdersByBuyerId,
  getOrdersByProducerId,
  getOrderById,
  updateOrderDeliveryStatus
}
