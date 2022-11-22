const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/getUserNames', userController.getUserNames)

module.exports = router
