const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/', userController.getAllUsers)

router.get('/isExist/:id', userController.isExist)

router.get('/getUserNames', userController.getUserNames)

router.get('/getById', userController.getUserById)

router.post('/', userController.addUser)

module.exports = router
