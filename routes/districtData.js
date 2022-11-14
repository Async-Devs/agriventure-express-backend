const express = require('express')

const router = express.Router()
const dataEntryController = require('../controllers/districtData')

router.get('/', dataEntryController.getAllDistrictData)
router.post('/', dataEntryController.addDistrictData)
router.put('/', dataEntryController.updateDistrictData)
router.delete('/:id', dataEntryController.deleteDataById)

module.exports = router
