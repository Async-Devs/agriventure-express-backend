const { SupportRequest } = require('../models/supportRequest')
const { Producer } = require('../models/producer')

const getAllSupportRequests = async (req, res) => {
  const supportRequestList = await SupportRequest.find().populate('producerId')
  if (supportRequestList) {
    res.status(500).json({ success: false })
  }
  res.send(supportRequestList)
}

const getSupportRequestById = async (req, res) => {
  const supportRequest = await SupportRequest.findById(req.params.id).populate('ProducerId')
  if (!supportRequest) {
    res.status(500).json({
      success: false
    })
  }
  res.send({
    supportRequest,
    success: true
  })
}

const addSupportRequest = async (req, res) => {
  const producer = await Producer.findById(req.body.producerId)
  if (!producer) {
    return res.status(400).send('Invalid Producer')
  }

  let supportRequest = new SupportRequest({
    producerId: req.body.producerId,
    type: req.body.type,
    description: req.body.description,
    messages: req.body.messages
  })

  supportRequest = await supportRequest.save()
  if (!supportRequest) {
    return res.status(500).json({
      success: false
    })
  }
  res.send({
    supportRequest,
    success: true
  })
}

module.exports = {
  getAllSupportRequests,
  getSupportRequestById,
  addSupportRequest
}
