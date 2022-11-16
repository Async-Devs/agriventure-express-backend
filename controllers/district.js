const mongoose = require('mongoose')
const {Districts} = require("../models/districts");

const getAllDistrict =  async (req, res) => {
    console.log("routing done")
    const districtList = await Districts.find()
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