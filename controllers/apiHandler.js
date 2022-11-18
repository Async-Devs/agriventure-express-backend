const getSocketURL = async (req, res) =>{
	const socketURL = process.env.SOCKET_URL
	res.status(200).send(socketURL);
}

module.exports = {
	getSocketURL
}
