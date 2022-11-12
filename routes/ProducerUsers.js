const router = require("express").Router();
const supportRequestController = require('../controllers/supportRequest');

router.get("/mySupportRequest",supportRequestController.getMySupportRequests);

router.post("/addSupportRequest",supportRequestController.addSupportRequest);

module.exports = router;