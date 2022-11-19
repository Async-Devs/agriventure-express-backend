const socketIo = require('socket.io');

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
		socket.on("place_bid", (data)=>{
			console.log(data);
			socket.to(data.itemListing).emit("receive_bid_update",data);
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
