const { SupportRequestMessage } = require('../models/supportRequestMessage')
const jwt = require('jsonwebtoken')

const addSupportRequestMessage = async (req, res) => {
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userId = userToken.userId

    let supportRequestMessage = new SupportRequestMessage({
      senderId: userId,
      message: req.body.message,
      requestId: req.body.requestId
    })

    supportRequestMessage = await supportRequestMessage.save()
    if (!supportRequestMessage) {
      return res.status(500).json({
        success: false
      })
    }
    res.send({
      supportRequestMessage,
      success: true
    })
  } catch (error) {
    res.status(403).json({
      success: false,
      msg: 'Invalid token'
    })
  }
}

module.exports = {
  addSupportRequestMessage
}
