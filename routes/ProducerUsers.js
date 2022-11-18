const router = require("express").Router();
const supportRequestController = require('../controllers/supportRequest');
const refundRequestController = require('../controllers/refundRequest');
const supportRequestMessageController = require('../controllers/supportRequestMessage');
const producerRouter = require('../controllers/producer');
const location = require('../controllers/location')
const ItemController = require('../controllers/item')

router.get("/mySupportRequest",supportRequestController.getMySupportRequests);
router.get("/myRefundRequest",refundRequestController.getMyRefundRequests);
router.get("/google-API-key",location.getGoogleAPIkey);

router.post('/addSupportRequest', supportRequestController.addSupportRequest)
router.post('/addSupportRequestMessage', supportRequestMessageController.addSupportRequestMessage)
router.post('/items/add-item', ItemController.addItem)

router.put('/addSupportRequestMessage', supportRequestController.updateSupportRequest)
router.put('/editMyProfile', producerRouter.updateMyProfile)
router.put('/openSupportRequest', supportRequestController.openSupportRequest)

module.exports = router;
