const mongoose = require('mongoose')
const {Districts} = require("../models/districts");

const getAllDistrict =  async (req, res) => {
    const districtList = await Districts.find().sort({'name':1})
    if (!districtList) {
        res.status(500).json({ success: false })
    }
    res.send({
        success: true,
        districtList: districtList
    })
}

module.exports = {
    getAllDistrict
}