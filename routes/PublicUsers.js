const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/myProfile', userController.getMyProfile)

router.put('/updateMyProfile', userController.editMyProfile)

module.exports = router
