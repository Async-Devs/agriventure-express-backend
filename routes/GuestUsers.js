const router = require('express').Router()
const dataEntryController = require('../controllers/dataEntry')
const { DistrictController } = require('../controllers/districts')

router.get('/', dataEntryController.getAllDataEntry)
router.get('/:id', DistrictController.getDistrictById)

module.exports = router
