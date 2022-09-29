const { Item } = require('../models/Item')

class ItemController {
	static async getAllItems(req,res){
	  	const itemArray = await Item.find();
		return res.send(itemArray);
  	};
	
	static async getItemById(req, res){
		const item = await Item.findById(req.params.id);
		return res.send(item);
	}
}

module.exports.ItemController = ItemController;
