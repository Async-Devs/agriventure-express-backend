const router = require('express').Router()
const officerController = require('../controllers/officer')
const userController = require('../controllers/user')

router.get('/getAllOfficers',officerController.getAllOfficers)

router.post('/addOfficer', officerController.addNewOfficer)
router.post('/addUser', userController.addUser)

router.put('/activeUser',userController.approveUser)
router.put('/disableUser',userController.disableUser)
module.exports = router
