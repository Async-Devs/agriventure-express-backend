const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyer');

router.get('/',buyerController.getALLBuyers);
router.get('/getByUserId',buyerController.getUserBtId);
router.post(`/`,buyerController.addUser);
router.delete('/deleteById/:id/:userId', buyerController.deleteUser);
router.put('/updateMyProfile',buyerController.updateProfile);


module.exports = router;