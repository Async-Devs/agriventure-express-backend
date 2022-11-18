const { User } = require('../models/user')
const { Producer } = require('../models/producer')
const mongoose = require('mongoose')
const { Buyer } = require('../models/buyer')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const {Officer} = require("../models/officer");

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
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(500).json({ success: false, message: 'user not found!' })
  }
  if (user.userType === 0) {
    const producer = await Producer.findOne({ login: mongoose.Types.ObjectId(req.params.id) }).populate('district').populate('login')
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
        user: buyer,
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
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userId = userToken.userId
    if (userToken.userType === 0) {
      const producer = await Producer.findOne({ login: mongoose.Types.ObjectId(userId) }).populate('district').populate('login')
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
    }else if (userToken.userType === 2) {
      const officer = await Officer.findOne({ login: mongoose.Types.ObjectId(userId) }).populate('login').populate('district')
      if (!officer) {
        res.status(500).json({
          success: false,
          message: 'Officer not found'
        })
      }
      res.send(
          {
            user: officer,
            success: true
          }
      )
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      success: false,
      msg: 'Invalid token'
    })
  }
}

const approveUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.body.id,
    { isActive: true }
  )

  if (!user) {
    return res.status(404).send({ message: 'The user can not be updated', success: false })
  }
  res.send({
    success: true,
    user
  })
}

const disableUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.body.id,
      { isActive: false }
  )

  if (!user) {
    return res.status(404).send({ message: 'The user can not be updated', success: false })
  }
  res.send({
    success: true,
    user
  })
}

const editProfile = async (req, res) => {
  const userId = req.body.id
  if (req.body.userType === 0) {
    const producerUpdate = await Producer.findByIdAndUpdate(
      userId,
      {
        email: req.body.email,
        telNum: req.body.telNum,
        address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }, { new: true })
    if (!producerUpdate) {
      return res.status(404).send({ message: 'The producer can not be updated', success: false })
    }
    res.send({
      success: true,
      producerUpdate
    })
  } else if (req.body.userType === 1) {
    const buyerUpdate = await Buyer.findByIdAndUpdate(
      userId,
      {
        email: req.body.email,
        telNum: req.body.telNum,
        address: req.body.address
      }, { new: true })
    if (!buyerUpdate) {
      return res.status(404).send({ message: 'The buyer can not be updated', success: false })
    }
    res.send({
      success: true,
      producer: buyer
    })
  }
}

const editMyProfile = async (req, res) => {
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userId = userToken.userId
    if (userToken.userType === 0) {
      const producer = await Producer.findOne({ login: mongoose.Types.ObjectId(userId) }).populate('location').populate('login')
      if (!producer) {
        res.status(500).json({
          success: false,
          message: 'Producer not found'
        })
      }

      const producerId = producer._id

      const producerUpdate = await Producer.findByIdAndUpdate(
        producerId,
        {
          email: req.body.email,
          telNum: req.body.telNum,
          address: req.body.address
        }, { new: true })
      if (!producerUpdate) {
        return res.status(404).send({ message: 'The producer can not be updated', success: false })
      }
      res.send({
        success: true,
        producerUpdate
      })
    } else if (userToken.userType === 1) {
      const buyer = await Buyer.findOne({ login: mongoose.Types.ObjectId(userId) }).populate('login')
      if (!buyer) {
        res.status(500).json({
          success: false,
          message: 'Buyer not found'
        })
      }
      buyerId = buyer._id

      const buyerUpdate = await Buyer.findByIdAndUpdate(
        buyerId,
        {
          email: req.body.email,
          telNum: req.body.telNum,
          address: req.body.address
        }, { new: true })
      if (!buyerUpdate) {
        return res.status(404).send({ message: 'The buyer can not be updated', success: false })
      }
      res.send({
        success: true,
        producer: buyer
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      success: false,
      msg: 'Invalid token'
    })
  }
}

const addUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  let user = new User({
    userName: req.body.userName,
    password: hashedPassword,
    userType: req.body.userType,
    isActive: req.body.isActive
  })

  user = await user.save()
  if (!user) {
    return res.status(500).json({
      success: false
    })
  }
  const accessToken = await JWT.sign(
    {
      userName: user.userName,
      userType: user.userType,
      userId: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '14400s' }
  )
  res.send({
    user,
    accessToken,
    success: true
  })
}

const signIn = async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName })
  if (!user) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid Username or password'
    })
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password)
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      msg: 'Invalid Username or password'
    })
  }

  const accessToken = await JWT.sign(
    {
      userName: user.userName,
      userType: user.userType,
      userId: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '240m' }
  )

  res.json({
    success: true,
    accessToken,
    userId: user.id,
    userType: user.userType
  })
}

module.exports = {
  getAllUsers,
  isExist,
  getUserNames,
  getUserById,
  addUser,
  signIn,
  getMyProfile,
  editMyProfile,
  editProfile,
  approveUser,
  disableUser
}
