const cron = require('node-cron')
const { convertToOrder } = require('./item')

const convertOrdersSchedule = ()=>{
	cron.schedule('10,20,30,40,50 * * * * *', () => {
		console.log('running a task every minute');
		convertToOrder();
	});
}

module.exports = {
	convertOrdersSchedule
}
