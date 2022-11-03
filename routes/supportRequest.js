const { SupportRequest } = require('../models/supportRequest')
const express = require('express')
const { Producer } = require('../models/producer')
const router = express.Router()
const supportRequestController = require('../controllers/supportRequest')

router.get('/', supportRequestController.getAllSupportRequests)

router.get('/:id', supportRequestController.getSupportRequestById)

router.post('/', supportRequestController.addSupportRequest)
