const db = require("../util/database");
const dotenv = require("dotenv");
dotenv.config();

class Order {
    constructor(orderDetails) {
        this.order_id = orderDetails.order_id;
        this.customer_id = orderDetails.customer_id;
        this.cart_id = orderDetails.cart_id;
        this.date = orderDetails.date;
        this.order_name = orderDetails.order_name;
        this.delivery_address = orderDetails.delivery_address;
        this.phone_number = orderDetails.phone_number;
        this.delivery_method = orderDetails.delivery_method;
        this.payment = orderDetails.payment;
    }

    static fetchAll() {
        const select_all_query =
            "";
        const result = db.execute(select_all_query, []);
        return result;
    }

    static async getOrderById(orderId) {
        const product_values_query =
            "";
        const result = await db.execute(product_values_query, [orderId]);
        return result[0];
    }

    static async getCustomerOrders(customerId) {
        const customer_order_query =
            "";
        const result = await db.execute(customer_order_query, [customerId]);
        return result;
    }

    static async insertNewOrder(details) {
        let insertOrder = null;
        let outputOrderId = "NewOrderID";
        return result;
    }
}

module.exports.Order = Order;
