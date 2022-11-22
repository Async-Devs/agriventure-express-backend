const {User} = require("../models/user");
const mongoose = require('mongoose')

async function isExist(userId) {
    console.log(123);
    const user = await User.findById(userId);
    console.log(123);
    if (!user) {
        return false;
    }
    return true;
}

module.exports = {
    isExist
}