const {User} = require("../models/user");
const {Producer} = require("../models/producer");
const mongoose = require("mongoose");
const {Buyer} = require("../models/buyer");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const userList = await User.find()
  if (!userList) {
    res.status(500).json({ success: false })
  }
  res.send(userList)
}

const isExist = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(500).json({ success: false })
  }
  res.send({ success: true })
}

const getUserNames = async (req, res) => {
  const userList = await User.find().select('userName')
  if (!userList) {
    res.status(500).json({ success: false })
  }
  res.send(userList)
}

const getUserById = async (req, res) => {
  const user = await User.findById(req.query.id)
  if (!user) {
    res.status(500).json({ success: false, message: 'user not found!' })
  }
  if (user.userType === 0) {
    const producer = await Producer.findOne({ login: mongoose.Types.ObjectId(req.query.id) }).populate('location').populate('cropTypes').populate('login')
    if (!producer) {
      res.status(500).json({
        success: false,
        message: 'Producer not found'
      })
    }

    res.send(
      {
        user,
        typeDetails: producer,
        success: true
      }
    )
  } else if (user.userType === 1) {
    const buyer = await Buyer.findOne({ login: mongoose.Types.ObjectId(req.query.id) }).populate('login')
    if (!buyer) {
      res.status(500).json({
        success: false,
        message: 'Buyer not found'
      })
    }
    res.send(
      {
        user,
        typeDetails: buyer,
        success: true
      }
    )
  }

  res.send(
    {
      user,
      success: true
    }
  )
}

const getMyProfile = async (req, res) => {
    try{
        const userToken = await jwt.verify(req.header("x-auth-token"),process.env.ACCESS_TOKEN_SECRET);
        const userId = userToken.userId;
        if (userToken.userType === 0) {
            const producer = await Producer.findOne({ login: mongoose.Types.ObjectId(userId) }).populate('location').populate('cropTypes').populate('login');
            if (!producer) {
                res.status(500).json({
                    success: false,
                    message: 'Producer not found'
                })
            }

            res.send(
                {
                    user: producer,
                    success: true
                }
            )
        } else if (userToken.userType === 1) {
            const buyer = await Buyer.findOne({ login: mongoose.Types.ObjectId(userId) }).populate('login')
            if (!buyer) {
                res.status(500).json({
                    success: false,
                    message: 'Buyer not found'
                })
            }
            res.send(
                {
                    user: buyer,
                    success: true
                }
            )
        }

    }catch (error){
        res.status(403).json({
            success: false,
            msg: "Invalid token"
        });
    }

}

const addUser = async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    let user = new User({
        userName: req.body.userName,
        password: hashedPassword,
        userType: req.body.userType,
        isActive: req.body.isActive
    });

    user = await user.save();
    if(!user){
        return res.status(500).json({
            success: false
        });
    }
    const accessToken = await JWT.sign(
        {userName: user.userName,
                userType: user.userType,
                userId: user.id},
                process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "14400s"}
    );
    res.send({
        user: user,
        accessToken: accessToken,
        success: true
    });

}

const signIn = async (req,res) =>{
    const user = await User.findOne({userName: req.body.userName});
    if(!user){
        return res.status(400).json({
            success: false,
            msg: "Invalid Username or password"
        })
    }

    let isMatch = await bcrypt.compare(req.body.password,user.password);
    if (!isMatch){
        return res.status(401).json({
            success: false,
            msg: "Invalid Username or password"
        });
    }

    const accessToken = await JWT.sign(
        {userName: user.userName,
            userType: user.userType,
            userId: user.id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "14400s"}
    );

    res.json({
        success: true,
        accessToken: accessToken,
        userId: user.id,
        userType: user.userType
    });





}


module.exports = {
    getAllUsers,
    isExist,
    getUserNames,
    getUserById,
    addUser,
    signIn,
    getMyProfile
}
