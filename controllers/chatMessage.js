const {ChatMessage} = require("../models/chatMessage");
const {User} = require("../models/user");


const getAllChatMessage = async (req, res) => {
    const chatMessageList = await ChatMessage.find().populate('sender').populate('receiver');
    if(!chatMessageList){
        res.status(500).json({success: false});
    }
    res.send(chatMessageList);
}

const addChatMessage = async (req,res)=>{

    const sender = await User.findById(req.body.sender);
    if(!sender){
        return res.status(400).send('Invalid sender');
    }

    const receiver = await User.findById(req.body.receiver);
    if(!receiver){
        return res.status(400).send('Invalid receiver');
    }

    let chatMessage = new ChatMessage({
        body: req.body.body,
        sender: req.body.sender,
        receiver: req.body.receiver
    });

    chatMessage = await chatMessage.save();
    if(!chatMessage){
        return res.status(500).json({
            success: false
        });
    }
    res.send({
        chatMessage: chatMessage,
        success: true
    });

}

const getChatMessageById = async (req,res)=>{
    const chatMessage = await ChatMessage.findById(req.params.id).populate('sender').populate('receiver');
    if(!chatMessage){
        res.status(500).json({
            success: false
        });
    }
    res.send({
        chatMessage: chatMessage,
        success: true
    });
}



module.exports = {
    getAllChatMessage,
    addChatMessage,
    getChatMessageById
}