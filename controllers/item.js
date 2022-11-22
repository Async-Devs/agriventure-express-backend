const { Item } = require('../models/Item')
const moment = require('moment-timezone')
const mongoose = require('mongoose')
const { Order } = require('../models/Order')

const getAllItems = async (req, res) => {
  const itemArray = await Item.find()
  const itemsThatAreNotExpired = itemArray.filter((e)=>{
    const end = moment(e.bid_end_time).unix();
    const currentTime = moment().unix()
   return end + 120 >currentTime;
  })
  return res.send(itemsThatAreNotExpired);
}

const getAllListingByProducerId = async (req, res) => {
  const producerId = req.params.id
  let itemListings = [];
  itemListings = await Item.find({producer:producerId});
  return res.send(itemListings)
}

const getItemById = async (req, res) => {
  let item = null
  try {
    item = await Item.findById(req.params.id).populate("bidding_array.bidder")
  } catch (e) {
    item = 'NoItem' + e
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

const bidTransactionHelper = async (bid, isSocketMode = false)=>{
  
  let result = -1;
  let newData = null;
  const db = await mongoose.connection;
  const session = await db.startSession();
  
  try {
    //db Transaction start
    session.startTransaction();
    
    const currentItem = await Item.findById(bid.itemId, null,{session})
    const currentItemBiddingArray = currentItem.bidding_array;
    
    // Bid Validation get Current Max here
    const maxbid = Math.max(...currentItemBiddingArray.map(o => o.bid_amount))
    const bidObject = {
      time_stamp: moment(),
      bidder: bid.userId,
      bid_amount: bid.bidValue
    }
    
    // If Bid validation fails
    if(bidObject.bid_amount <= maxbid + currentItem.minimum_bid_step){
      await session.abortTransaction();
      return result;
    }
    // Update Lisitng
    await Item.updateOne({_id:bid.itemId}, { $push: {bidding_array: bidObject }}, {session});
    newData = await Item.findById(bid.itemId,null,{session}).populate("bidding_array.bidder");
    
    result = 0;
    //db Transaction end
    await session.commitTransaction();
    
  }catch (error){
    console.log(error);
    result = -1;
    await session.abortTransaction();
    return result;
    
  }
  
  session.endSession();
  
  //If in socket Mode
  if(isSocketMode){
    const socketData = {
      result: result,
      newData: newData
    }
    return socketData;
  }
  
  return result;
}

const setBidById = async (req, res) =>{
  let error = -1;
  const bid = req.body.data
  const result = await bidTransactionHelper(bid);
  if(result!=-1){
    error=false;
  }else {
    error = true;
  }
  return res.send({ error: error});
}

const convertToOrder = async ()=>{
  const db = await mongoose.connection;
  const session = await db.startSession();
  try {
    //db Transaction start
    session.startTransaction();
    const activeItems = await Item.find({state:"ACTIVE"})
    console.log("Order Scheduler \n --------------------------------------\n", activeItems.length);
    // return;
    activeItems.map(
        async (e)=>{
      if(moment(e.bid_end_time).unix()<moment().unix()){
        console.log(e._id, e.name);
        // await Item.findByIdAndUpdate(e._id, {state: "ENDED"},{session});
        if(e.bidding_array.length>0){
          const bidWinner = e.bidding_array[e.bidding_array.length-1]
          // await Order.insertOne({
          //   producer: e.producer,
          //   buyer: ,
          //   item: {
          //     type: mongoose.Schema.Types.ObjectId,
          //     ref: 'Item',
          //     required: true
          //   },
          //   messages: [{
          //     type: mongoose.Schema.Types.ObjectId,
          //     ref: 'ChatMessage',
          //     required: true,
          //     default: []
          //   }],
          //   order_status: {
          //     type: String,
          //     required: true, // ACTIVE, COMPLETE, REMOVED
          //     default: 'ACTIVE'
          //   },
          //   payment_status: {
          //     type: String,
          //     required: true, // PENDING, PAID
          //     default: 'PENDING'
          //   },
          //   delivery_status: {
          //     type: String,
          //     required: true, // PROCESSING, OUT-FOR-DELIVERY, DELIVERED
          //     default: 'PROCESSING'
          //   },
          //   order_price: {
          //     type: Number,
          //     required: true
          //   },
          //   order_date_time: {
          //     type: mongoose.Schema.Types.Date,
          //     required: true
          //   },
          //   order_delivery_address: String,
          //   order_delivery_city: String,
          //   order_delivery_zipcode: String
          // });
        }else{
          console.log("No Bid");
          // Order Is not Created Because No one Bid On the Item
        }
      
      }
    })
  
    await session.commitTransaction();
  }catch (e){
    console.log("Order Schedule Error")
  }
}

module.exports = {
  getAllItems,
  getItemById,
  getAllListingByProducerId,
  addItem,
  setBidById,
  bidTransactionHelper,
  convertToOrder
}
