const { Buyer } = require('../models/buyer')
const { User } = require('../models/user')
const { Producer } = require('../models/producer')

const getALLBuyers = async (req, res) => {
  const buyerList = await Buyer.find().populate('login')
  if (!buyerList) {
    res.status(500).json({ success: false })
  }
  res.send({
    buyerList,
    success: true
  })
}

const getNoOfBuyers = async (req, res) => {
  const dataList = await Buyer.aggregate([
    {
      $count: 'id'
    }
  ])

  if (!dataList) {
    res.status(500).json({ success: false })
  }
  res.send(dataList)
}

const getUserBtId = async (req, res) => {
  const buyer = await Buyer.findOne({ login: req.query.login }).populate('login')
  if (!buyer) {
    res.status(500).json({
      success: false
    })
  }
  res.send({
    buyer,
    success: true
  })
}

const addUser = async (req, res) => {
  const login = await User.findById(req.body.login)
  if (!login) {
    return res.status(400).send('Invalid user')
  }

  let buyer = new Buyer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nic: req.body.nic,
    email: req.body.email,
    address: req.body.address,
    telNum: req.body.telNum,
    login: req.body.login
  })

  buyer = await buyer.save()
  if (!buyer) {
    return res.status(500).json({
      success: false
    })
  }
  res.send({
    buyer,
    success: true
  })
}

const deleteUser = (req, res) => {
  Buyer.findByIdAndRemove(req.params.id).then(buyer => {
    if (buyer) {
      User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
          return res.status(200).json({
            success: true,
            message: 'the user was deleted'
          })
        } else {
          return res.status(404).json({
            success: false, message: 'user not found'
          })
        }
      }).catch(err => {
        return res.status(400).json({
          success: false, error: err
        })
      })
    } else {
      return res.status(404).json({
        success: false, message: 'buyer not found'
      })
    }
  }).catch(err => {
    return res.status(400).json({
      success: false, error: err
    })
  })
}

const updateProfile = async (req, res) => {
  const buyer = await Buyer.findByIdAndUpdate(
    req.body.id,
    {
      email: req.body.email,
      telNum: req.body.telNum,
      address: req.body.address
    }, { new: true })
  if (!buyer) {
    return res.status(404).send({ message: 'The buyer can not be updated', success: false })
  }
  res.send({
    success: true,
    producer: buyer
  })
}

module.exports = {
  getALLBuyers,
  getUserBtId,
  addUser,
  deleteUser,
  updateProfile,
  getNoOfBuyers
}
