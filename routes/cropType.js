const { CropType } = require('../models/cropType')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const cropTypeList = await CropType.find()
  if (!cropTypeList) {
    res.status(500).json({ success: false })
  }
  res.send(cropTypeList)
})

router.post('/', async (req, res) => {
  let cropType = new CropType({
    name: req.body.name
  })

  cropType = await cropType.save()
  if (!cropType) {
    return res.status(500).json({
      success: false
    })
  }
  res.send(cropType)
})

module.exports = router
