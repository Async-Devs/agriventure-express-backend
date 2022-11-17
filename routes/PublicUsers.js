const router = require("express").Router();
const userController = require('../controllers/user');
const refundRequestMessageController = require("../controllers/refundRequestMessage");
const refundRequestController = require("../controllers/refundRequest");
const chatMessageController = require('../controllers/chatMessage');

router.get("/myProfile",userController.getMyProfile);

router.post("/addRefundRequestMessage",refundRequestMessageController.addRefundRequestMessage);
router.post("/addChatMessage",chatMessageController.addChatMessage);

router.put("/updateMyProfile",userController.editMyProfile);
router.put("/addRefundRequestMessage",refundRequestController.updateRefundRequest);
router.put("/openRefundRequest",refundRequestController.openRefundRequest);
router.put("/addChatMessage",chatMessageController.updateOrder);

module.exports = router;