const { DataEntry } = require('../models/dataEntry')

const getAllDataEntry = async (req, res) => {
  const dataList = await DataEntry.find()
  if (!dataList) {
    res.status(500).json({ success: false })
  }
  res.send(dataList)
}

const addDataEntry = async (req, res) => {
  let data = new DataEntry({
    year: req.body.year,
    cropType: req.body.cropType,
    location: req.body.location,
    cropAmount: req.body.cropAmount
  })

  data = await data.save()
  if (!data) {
    return res.status(500).json({
      success: false
    })
  }
  res.send(data)
}

const updateDataEntry = async (req, res) => {
  const data = await DataEntry.findByIdAndUpdate(
    req.body.id,
    {
      year: req.body.year,
      cropType: req.body.cropType,
      location: req.body.location,
      cropAmount: req.body.cropAmount
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
  DataEntry.findByIdAndRemove(req.params.id).then(data => {
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
  getAllDataEntry,
  addDataEntry,
  updateDataEntry,
  deleteDataById
}
