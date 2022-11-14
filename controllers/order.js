const { Order } = require('../models/Order')

class OrderController {
	static async getAllOrders (req, res) {
		console.log("fetching All Orders")
		const orderArray = await Order.find().populate("item").populate('buyer').populate('producer');
		return res.send(orderArray);
	};
	
	static async getAllActiveOrders (req, res) {
		console.log("fetching All Orders")
		const orderArray = await Order.find({order_status:"ACTIVE"}).populate("item").populate('buyer').populate('producer');
		return res.send(orderArray);
	};
	
	
	static async getOrdersByBuyerId (req, res) {
		console.log("get orders for buyer")
	};
	
	static async getOrdersByProducerId (req, res) {
		console.log("get orders for Producer")
	};
	
	static async getOrderById (req, res) {
		console.log("get order")
	};
	
}

module.exports.OrderController = OrderController
