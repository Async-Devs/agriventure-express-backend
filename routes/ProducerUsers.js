const router = require("express").Router();
const supportRequestController = require('../controllers/supportRequest');
const refundRequestController = require('../controllers/refundRequest');
const supportRequestMessageController = require('../controllers/supportRequestMessage');
const producerRouter = require('../controllers/producer');
const location = require('../controllers/location')
const itemController = require('../controllers/item')
const OrderController = require('../controllers/order')

router.get("/mySupportRequest",supportRequestController.getMySupportRequests);
router.get("/myRefundRequest",refundRequestController.getMyRefundRequests);
router.get("/google-API-key",location.getGoogleAPIkey);
router.get("/items/:id",itemController.getAllListingByProducerId);
router.get('/order-by-producerId/:id', OrderController.getOrdersByProducerId)

router.post('/addSupportRequest', supportRequestController.addSupportRequest)
router.post('/addSupportRequestMessage', supportRequestMessageController.addSupportRequestMessage)
router.post('/items/add-item', itemController.addItem)

router.put('/addSupportRequestMessage', supportRequestController.updateSupportRequest)
router.put('/editMyProfile', producerRouter.updateMyProfile)
router.put('/openSupportRequest', supportRequestController.openSupportRequest)
router.put('/update/delivery-status/:id', OrderController.updateOrderDeliveryStatus)

module.exports = router;
