const express = require('express');
const router = express.Router();
const chatMessageController = require('../controllers/chatMessage');

router.get('/',chatMessageController.getAllChatMessage);
router.get('/:id',chatMessageController.getChatMessageById);

router.post(`/`,chatMessageController.addChatMessage);




module.exports = router;