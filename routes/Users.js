const router = require('express').Router()
const userController = require('../controllers/user')
const fileUploadController = require('../controllers/fileUpload')

router.get('/getUserById/:id', userController.getUserById)
router.get('/isExist/:id', userController.isExist)
router.get("/myProfile",userController.getMyProfile);

router.post('/uploadFile',fileUploadController.uploadFile)

router.put('/updateProfilePicture',userController.editProfilePicture)
router.put('/updatePassword',userController.updatePassword)


module.exports = router
