const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/getUserById/:id', userController.getUserById)
router.get('/isExist/:id', userController.isExist)

module.exports = router
