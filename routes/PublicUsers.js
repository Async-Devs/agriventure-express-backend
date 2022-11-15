const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/myProfile', userController.getMyProfile)

module.exports = router
