const router = require("express").Router();
const userController = require('../controllers/user');
const refundRequestMessageController = require("../controllers/refundRequestMessage");
const refundRequestController = require("../controllers/refundRequest");
const chatMessageController = require('../controllers/chatMessage');
const { getSocketURL } = require('../controllers/apiHandler')
const OrderController = require('../controllers/order')

router.get("/myProfile",userController.getMyProfile);
router.get("/socket-URL", getSocketURL);
router.get("/get-order/:id", OrderController.getOrderById)

router.post("/addRefundRequestMessage",refundRequestMessageController.addRefundRequestMessage);
router.post("/addChatMessage",chatMessageController.addChatMessage);
router.post("/changeProfilePicture",userController.editProfilePicture)

router.put("/updateMyProfile",userController.editMyProfile);
router.put("/addRefundRequestMessage",refundRequestController.updateRefundRequest);
router.put("/openRefundRequest",refundRequestController.openRefundRequest);
router.put("/addChatMessage",chatMessageController.updateOrder);

module.exports = router
