require('express-async-errors')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const producerRouter = require('./routes/producer')
const locationRouter = require('./routes/location')
const cropTypeRouter = require('./routes/cropType')
const userRouter = require('./routes/user')
const buyerRouter = require('./routes/buyer')
const dataEntryRouter = require('./routes/dataEntry')
const officerRouter = require('./routes/officer')
const chatMessageRouter = require('./routes/chatMessage')
const itemRouter = require('./routes/items')
const dataRouter = require('./routes/dataEntry')
const authRouter = require('./routes/auth')
const districtRouter = require('./routes/districts')
const publicUsersRouter = require('./routes/PublicUsers')
const producerUsersRouter = require('./routes/ProducerUsers')
const orderRouter = require('./routes/orders')
const buyerUsersRouter = require('./routes/BuyerUsers')
const officerUsersRouter = require('./routes/OfficerUsers')
const guestUsersRouter = require('./routes/GuestUsers')
const usersRouter = require('./routes/Users')
const adminUserRouter = require('./routes/AdminUsers')

const express = require('express')

const PORT = process.env.PORT || 3001
const api = process.env.API_URL
const app = express()
// Socket.io
const server = require('http').createServer(app)
const socketHandler = require('./controllers/socketHandler');
const io = socketHandler.socketHandler(server);

app.use(cors())
app.options('*', cors())

app.use(express.json({limit: "20mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))


// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
console.log(api)
console.log(`${api}/items`)

// authTokens
const publicUsersToken = require('./middleware/publicUsersAuthToken')
const producersToken = require('./middleware/producerAuthToken')
const buyerToken = require('./middleware/buyerAuthToken')
const officerToken = require('./middleware/officerAuthToken')
const adminToken = require('./middleware/adminAuthToken')
const userToken = require('./middleware/usersAuthToken')

// Routes
app.use(`${api}/producers`, producerRouter)
app.use(`${api}/locations`, locationRouter)
app.use(`${api}/cropTypes`, cropTypeRouter)
app.use(`${api}/users`, userRouter)
app.use(`${api}/buyers`, buyerRouter)
app.use(`${api}/dataEntries`, dataEntryRouter)
app.use(`${api}/officer`, officerRouter)
app.use(`${api}/chatMessage`, chatMessageRouter)
app.use(`${api}/items`, itemRouter)
app.use(`${api}/orders`, orderRouter)
app.use(`${api}/dataEntries`, dataRouter)
app.use(`${api}/districts`, districtRouter)
app.use(`${api}/auth`, authRouter)
app.use(`${api}/publicUsers`, publicUsersToken, publicUsersRouter)
app.use(`${api}/producerUsers`, producersToken, producerUsersRouter)
app.use(`${api}/buyerUsers`, buyerToken, buyerUsersRouter)
app.use(`${api}/officerUsers`, officerToken, officerUsersRouter)
app.use(`${api}/adminUser`, adminToken, adminUserRouter)
app.use(`${api}/guestUsers`, guestUsersRouter)
app.use(`${api}/allUsers`, userToken, usersRouter)

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'agriventure-express-database'
}
).then(() => {
  console.log('Database Connection is ready')
}).catch((err) => {
  console.log(err)
})

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

setInterval(()=>{
  console.log("tick");
}, 1000);
