const express = require('express')

const router = express.Router()
const dataEntryController = require('../controllers/dataEntry')

router.get('/', dataEntryController.getAllDataEntry)
router.post('/', dataEntryController.addDataEntry)
router.put('/', dataEntryController.updateDataEntry)
router.delete('/:id', dataEntryController.deleteDataById)

module.exports = router
