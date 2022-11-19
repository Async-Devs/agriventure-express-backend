const { Districts } = require('../models/districts')

const getAllDistrict = async (req, res) => {
  const districtList = await Districts.find().sort({ name: 1 })
  if (!districtList) {
    res.status(500).json({ success: false })
  }
  res.send({
    success: true,
    districtList
  })
}

const getDistrictByName = async (req, res) => {
  const district = await Districts.aggregate([
    {
      $match: {
        name: req.params.name
      }
    }
  ])

  if (!district) {
    res.status(500).json({ success: false })
  }
  res.send(district)
}

module.exports = {
  getAllDistrict,
  getDistrictByName
}
