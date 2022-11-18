const { Item } = require('../models/Item')

const getAllItems = async (req, res) => {
  const itemArray = await Item.find()
  return res.send(itemArray);
}

const getAllListingByProducerId = async (req, res) => {
  let itemListings = [];
  console.log("Get items for producer",  )
  return res.send(itemListings)
}

const getItemById = async (req, res) => {
  let item = null
  try {
    item = await Item.findById(req.params.id)
  } catch (e) {
    item = 'NoItem'
  }
  return res.send(item)
}

const addItem = async (req, res) => {
  
  const data = req.body.data
  let {
    name,
    crop,
    images,
    description,
    quantity,
    location,
    minimum_bid,
    minimum_bid_step,
    bid_end_time
  } = data;
  
  let isValid = true;
  
  if(minimum_bid_step=="" || minimum_bid_step == null){
    minimum_bid_step = 0;
  }
  
  if(
      name === null ||
      crop === null ||
      quantity === null ||
      minimum_bid === null ||
      bid_end_time === null ||
      location.district === null ||
      location.city === null ||
      images.length <=null ){
    isValid = false;
  }
  if(
      name === "" ||
      crop === "" ||
      quantity === "" ||
      minimum_bid === "" ||
      location.district === "" ||
      location.city === "" ||
      images.length <=0 ){
    isValid = false;
  }
  if (isNaN(quantity) || quantity>100000000 || quantity <1){
    isValid = false;
  }
  if (isNaN(minimum_bid) || minimum_bid>1000000000 || minimum_bid <1){
    isValid = false;
  }
  if (isNaN(minimum_bid_step) || minimum_bid_step>minimum_bid/10 || minimum_bid_step <0){
    isValid = false;
  }
  if(isValid){
    // Add to Database
    let itemListing = new Item(data)
    try {
    itemListing = await  itemListing.save();
    
    }catch (e){
      console.log(e);
      return res.status(200).send({ Error: true, DisplayText: "Error Occurred Try Again !" });
    }
    return res.status(201).send({ Error: false, DisplayText: "Success! New Listing Added" });
  }
  return res.status(200).send({ Error: true, DisplayText: "Error: Invalid Details. Try Again !" });
}

const setBidById = async (req, res) =>{
  const bid = req.body.data
  // console.log(bid);
  // WIP: db Transaction start
  
  const currentItem = await Item.findById(bid.itemId)
  
  const bidding = {
    time_stamp: '2022-09-29T18:25:43.511+00:00', // WIP: get current time from moment()
    bidder_name: 'User Auth Error: User Auth Work in Progress',
    bid_amount: bid.bidValue
  }
  const updatedDoc = await Item.findByIdAndUpdate(bid.itemId)
  console.log(currentItem)
  // WIP: db Transaction end
}

module.exports = {
  getAllItems,
  getItemById,
  getAllListingByProducerId,
  addItem,
  setBidById
}
