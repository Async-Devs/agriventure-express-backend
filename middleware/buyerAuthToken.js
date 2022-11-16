const jwt = require('jsonwebtoken')
require('dotenv').config()

const authToken = async (req, res, next) => {
  const token = await req.header('x-auth-token')

  if (!token) {
    res.status(401).json({
      success: false,
      msg: 'Token not found'
    })
  } else {
    try {
      const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if (user.userType === 1) {
        next()
      } else {
        return res.status(403).json({
          success: false,
          msg: 'unauthorized access'
        })
      }
    } catch (error) {
      res.status(403).json({
        success: false,
        msg: 'Invalid token found'
      })
    }
  }
}

module.exports = authToken
