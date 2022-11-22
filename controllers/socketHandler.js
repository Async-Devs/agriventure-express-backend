const socketIo = require('socket.io');
const { bidTransactionHelper } = require('./item')

const socketHandler = (server)=>{
	const io = socketIo(server, { cors: { origin: '*' } })

	io.on('connect', async (socket) => {
		const x = await  io.fetchSockets()
		console.log('Socket connected of ID: ', socket.id, "Number of Clients - ", x.length)
		
		// Used to on opening a listing
		socket.on("join_listing", (data)=>{
			socket.join(data.itemListing);
		});
		
		// On bid placement
		socket.on("place_bid", async (data)=>{
			const result = await bidTransactionHelper(data, true);
			console.log("socket input - ", result);
			let outputData = null;
			try {
				if(result!=-1){
					outputData= {
						error: false,
						res_array: result.newData.bidding_array
					};
				}else {
					outputData= {
						error: true,
						res_array: null
					};
				}
				
			}catch (e){
				outputData= {
					error: true,
					res_array: null
				};
			}
			socket.to(data.itemId).emit("receive_bid_update", outputData);
		});
		
		socket.on("disconnect", (reason) => {
			console.log("Socket Disconnected. Socket ID - ", socket.id, " reason - ", reason);
		});
		
	})

	setInterval(() => {
		io.emit('message', Math.random());
	}, 1000);
	return io;
}

module.exports = {
	socketHandler
}
