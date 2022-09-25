require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const producerRouter = require('./routes/producer');

const express = require("express");

const PORT = process.env.PORT || 3001;
const api = process.env.API_URL;
const app = express();

app.use(cors());
app.options('*',cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routes
app.use(`${api}/producers`, producerRouter);

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