const router = require("express").Router();
const supportRequestController = require('../controllers/supportRequest');
const supportRequestMessageController = require('../controllers/supportRequestMessage');

router.get("/mySupportRequest",supportRequestController.getMySupportRequests);

router.post("/addSupportRequest",supportRequestController.addSupportRequest);
router.post("/addSupportRequestMessage",supportRequestMessageController.addSupportRequestMessage);

router.put("/addSupportRequestMessage",supportRequestController.updateSupportRequest);

module.exports = router;