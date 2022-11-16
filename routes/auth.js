const router = require('express').Router()
const producerController = require('../controllers/producer')
const buyerController = require('../controllers/buyer')
const userController = require('../controllers/user')

require('dotenv').config()

// signup
router.post('/addProducer', producerController.addNewProducer)
router.post('/addBuyer', buyerController.addUser)
router.post('/addUser', userController.addUser)
router.post('/login', userController.signIn)

module.exports = router
