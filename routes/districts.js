const { DistrictController } = require('../controllers/districts')
const express = require('express')
const router = express.Router()

router.get('/', DistrictController.getAllDistricts)
router.get('/:id', DistrictController.getDistrictById)

module.exports = router
