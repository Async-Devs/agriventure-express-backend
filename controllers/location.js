const { Location } = require('../models/location')

const getAllLocations = async (req, res) => {
  const locationList = await Location.find().populate('district')
  if (!locationList) {
    res.status(500).json({ success: false })
  }
  res.send(locationList)
}

const addLocation = async (req, res) => {
  let location = new Location({
    district: req.body.district,
    city: req.body.city
  })

  location = await location.save()
  if (!location) {
    return res.status(500).json({
      success: false
    })
  }
  res.send(location)
}

module.exports = {
  getAllLocations,
  addLocation
}
