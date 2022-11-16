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

router.get('/:id', async (req, res) => {
  const croptype = await CropType.findById(req.params.id)
  if (!croptype) {
    res.status(500).json({ success: false })
  }
  res.send(croptype)
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
