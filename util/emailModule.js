const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.TRANSPORTER_USERNAME,
        pass: process.env.TRANSPORTER_PWD,
    },
});
module.exports = transporter;