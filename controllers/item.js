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
		
		console.log(item);
		return res.send(item);
	}
}

module.exports.ItemController = ItemController;
