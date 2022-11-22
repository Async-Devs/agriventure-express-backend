const cron = require('node-cron')
const { convertToOrder } = require('./item')
const moment = require('moment-timezone')

const convertOrdersSchedule = ()=>{
	cron.schedule('* * * * *', () => {
		console.log('running Order Schedule: ', moment().format());
		convertToOrder();
	});
}

module.exports = {
	convertOrdersSchedule
}
