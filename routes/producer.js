const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producer');


router.get('/',producerController.getAllProducers);
router.post(`/`,producerController.addNewProducer);
router.put('/updateMyProfile',producerController.updateMyProfile);
router.get('/getByUserId',producerController.getUserById);
router.delete('/deleteById/:id/:userId', producerController.deleteById);

module.exports = router;
