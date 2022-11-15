const { OrderController } = require('../controllers/order')
const express = require('express')
const router = express()

router.get('/', OrderController.getAllOrders)
router.get('/active-orders', OrderController.getAllActiveOrders)
router.get('/order-by-buyerId/:id', OrderController.getOrdersByBuyerId)
router.get('/order-by-producerId/:id', OrderController.getOrdersByProducerId)
router.get('/:id', OrderController.getOrderById)
// router.get("/year-period-of-sold", OrderController.getYearPeriodOfSold);
// router.get("/:id", OrderController.getOrderCart);
// router.post("/checkout", OrderController.setOrderDetails);
// router.post("/checkout/payment", OrderController.confirmAndSetOrder);
// router.put("/update", OrderController.updateOrderStatus);

module.exports = router
