const { Districts } = require('../models/districts')

class DistrictController {
  static async getAllDistricts (req, res) {
    const districtArray = await Districts.find()
    return res.send(districtArray)
  };

  static async getDistrictById (req, res) {
    // const district = await Districts.findById(req.params.id)
    const district = await Districts.findById(req.params.id)
    return res.send(district)
  }
}

module.exports.DistrictController = DistrictController
