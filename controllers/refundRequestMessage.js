const { RefundRequestMessage } = require('../models/refundRequestMessage')
const jwt = require('jsonwebtoken')

const addRefundRequestMessage = async (req, res) => {
  try {
    const userToken = await jwt.verify(req.header('x-auth-token'), process.env.ACCESS_TOKEN_SECRET)
    const userId = userToken.userId

    let refundRequestMessage = new RefundRequestMessage({
      senderId: userId,
      message: req.body.message,
      requestId: req.body.requestId,
      date: Date.now()
    })

    refundRequestMessage = await refundRequestMessage.save()
    if (!refundRequestMessage) {
      return res.status(500).json({
        success: false
      })
    }
    res.send({
      refundRequestMessage,
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
  addRefundRequestMessage
}
