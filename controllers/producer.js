const {Producer} = require("../models/producer");
const {Location} = require("../models/location");
const {User} = require("../models/user");
const {CropType} = require("../models/cropType");

const getAllProducers = async (req, res) => {
    const producerList = await Producer.find().populate('location').populate('login').populate('cropTypes');
    if(!producerList){
        res.status(500).json({success: false});
    }
    res.send(producerList);
}

const addNewProducer = async (req,res)=>{

    const location = await Location.findById(req.body.location);
    if(!location){
        return res.status(400).send('Invalid location')
    }

    const login = await User.findById(req.body.login);
    if(!login){
        return res.status(400).send('Invalid user')
    }

    let producer = new Producer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        email: req.body.email,
        address: req.body.address,
        telNum: req.body.telNum,
        login: req.body.login,
        cropTypes: req.body.cropTypes,
        location: req.body.location
    });

    producer = await producer.save();
    if(!producer){
        return res.status(500).json({
            success: false
        });
    }
    res.send({
        producer: producer,
        success: true
    });

}

const updateMyProfile = async (req,res)=>{
    for(let i = 0; i < req.body.cropTypes.length; i++){
        const cropType = await CropType.findById(req.body.cropTypes[i]);
        if(!cropType){
            return res.status(400).send({success: false, message: 'Invalid crop type '+ req.body.cropTypes[i]});
        }
    }

    const producer = await Producer.findByIdAndUpdate(
        req.body.id,
        {
            email: req.body.email,
            telNum: req.body.telNum,
            address: req.body.address,
            cropTypes: req.body.cropTypes
        },{new: true})
    if(!producer){
        return res.status(404).send({message: 'The producer can not be updated', success: false});
    }
    res.send({
        success: true,
        producer: producer
    });
}

const getUserById = async (req,res)=>{
    const producer = await Producer.findOne({login: req.query.login}).populate('location').populate('cropTypes').populate('login');
    if(!producer){
        res.status(500).json({
            success: false
        });
    }
    res.send({
        producer: producer,
        success: true
    });
}

const deleteById = (req,res)=>{
    Producer.findByIdAndRemove(req.params.id).then(producer => {
        if(producer){

            console.log(req.params);

            User.findByIdAndRemove(req.params.userId).then(user => {
                if(user){
                    return res.status(200).json({
                        success: true,
                        message: 'the user was deleted'
                    });
                }else{
                    return res.status(404).json({
                        success: false, message: "user not found"
                    });
                }
            }).catch(err => {
                return res.status(400).json({
                    success: false, error: err
                });
            });

        }else{
            return res.status(404).json({
                success: false, message: "producer not found"
            });
        }
    }).catch(err => {
        return res.status(400).json({
            success: false, error: err
        });
    });
}

module.exports = {
    getAllProducers,
    addNewProducer,
    updateMyProfile,
    getUserById,
    deleteById,
}