const router = require('express').Router()
const userController = require('../controllers/user')
const fileUploadController = require('../controllers/fileUpload')

router.get('/getUserById/:id', userController.getUserById)
router.get('/isExist/:id', userController.isExist)

router.post('/uploadFile',fileUploadController.uploadFile)

router.put('/updateProfilePicture',userController.editProfilePicture)

module.exports = router
