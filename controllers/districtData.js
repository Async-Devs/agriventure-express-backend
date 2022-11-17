const { DistrictData } = require('../models/districtData')

const getAllDistrictData = async (req, res) => {
  const dataList = await DistrictData.find().populate('cropType').populate('district')
  if (!dataList) {
    res.status(500).json({ success: false })
  }
  res.send(dataList)
}

const addDistrictData = async (req, res) => {
  let data = new DistrictData({
    year: req.body.data.year,
    cropType: req.body.data.cropType,
    district: req.body.data.district,
    totalCropAmount: req.body.data.totalCropAmount
  })

  data = await data.save()
  if (!data) {
    return res.status(500).json({
      success: false
    })
  }
  res.send(data)
}

const updateDistrictData = async (req, res) => {
  const data = await DistrictData.findByIdAndUpdate(
    req.body.id,
    {
      year: req.body.year,
      cropType: req.body.cropType,
      district: req.body.district,
      totalCropAmount: req.body.totalCropAmount
    }, { new: true })
  if (!data) {
    return res.status(404).send({ message: 'The data entry can not be updated', success: false })
  }
  res.send({
    success: true,
    data
  })
}

const deleteDataById = (req, res) => {
  DistrictData.findByIdAndRemove(req.params.id).then(data => {
    console.log(req.params.id)
    if (data) {
      return res.status(200).json({
        success: true,
        message: 'the data entry was deleted'
      })
    } else {
      return res.status(404).json({
        success: false, message: 'data entry not found'
      })
    }
  }).catch(err => {
    return res.status(400).json({
      success: false, error: err
    })
  })
}

module.exports = {
  getAllDistrictData,
  addDistrictData,
  updateDistrictData,
  deleteDataById
}
