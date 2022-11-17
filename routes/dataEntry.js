const express = require('express')

const router = express.Router()
const dataEntryController = require('../controllers/dataEntry')

router.get('/', dataEntryController.getAllDataEntry)
router.get('/cropDetails', dataEntryController.getCropDetails)
router.get('/districtDetails', dataEntryController.getDistrictDetails)
router.post('/', dataEntryController.addDataEntry)
router.put('/', dataEntryController.updateDataEntry)
router.delete('/:id', dataEntryController.deleteDataById)

module.exports = router
