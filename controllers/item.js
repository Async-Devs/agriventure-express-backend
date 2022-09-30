const { Item } = require('../models/Item')

class ItemController {
	static async getAllItems(req,res){
	  	const itemArray = await Item.find();
		return res.send(itemArray);
  	};
	
	static async getItemById(req, res){
		let item = null;
		try {
			item = await Item.findById(req.params.id);
		}catch (e){
			item = `NoItem`;
		}
		return res.send(item);
	}
	static async setBidById(req, res){
		const bid = req.body.data
		// console.log(bid);
		// WIP: db Transaction start
		
		const currentItem = await Item.findById(bid.itemId);
		
		let bidding = {
			time_stamp:"2022-09-29T18:25:43.511+00:00", // WIP: get current time from moment()
			bidder_name: "User Auth Error: User Auth Work in Progress",
			bid_amount: bid.bidValue
		}
		const updatedDoc = await Item.findByIdAndUpdate(bid.itemId, )
		console.log(currentItem);
		// WIP: db Transaction end
	}
}

module.exports.ItemController = ItemController;
