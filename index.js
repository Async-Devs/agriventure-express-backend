require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const producerRouter = require('./routes/producer');
const locationRouter = require('./routes/location');
const cropTypeRouter = require('./routes/cropType');
const userRouter = require('./routes/user');
const buyerRouter = require('./routes/buyer');
const itemRouter = require('./routes/items');

const express = require("express");

const PORT = process.env.PORT || 3001;
const api = process.env.API_URL;
const app = express();

app.use(cors());
app.options('*',cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
console.log(api);
console.log(`${api}/items`);
//Routes
app.use(`${api}/producers`, producerRouter);
app.use(`${api}/locations`, locationRouter);
app.use(`${api}/cropTypes`, cropTypeRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/buyers`, buyerRouter);
app.use(`${api}/items`, itemRouter);

mongoose.connect(process.env.CONNECTION_STRING,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'agriventure-express-database'
    }
).then(()=>{
  console.log("Database Connection is ready")
}).catch((err)=>{
  console.log(err);
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
