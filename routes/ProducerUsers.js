const router = require("express").Router();
const supportRequestController = require('../controllers/supportRequest');
const refundRequestController = require('../controllers/refundRequest');
const supportRequestMessageController = require('../controllers/supportRequestMessage');
const producerRouter = require('../controllers/producer');

router.get("/mySupportRequest",supportRequestController.getMySupportRequests);
router.get("/myRefundRequest",refundRequestController.getMyRefundRequests);

router.post("/addSupportRequest",supportRequestController.addSupportRequest);
router.post("/addSupportRequestMessage",supportRequestMessageController.addSupportRequestMessage);

router.put("/addSupportRequestMessage",supportRequestController.updateSupportRequest);
router.put("/editMyProfile",producerRouter.updateMyProfile);
router.put('/openSupportRequest',supportRequestController.openSupportRequest);

module.exports = router;