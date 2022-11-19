const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const washingRoutes = require('./routes/api-washing-routes');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) return console.error(err);
  console.log('Connected to MongoDb');
});

app.listen(process.env.PORT, (err) => {
  if (err) return console.error(err);
  console.log(`listening port ${process.env.PORT}`);
});

app.use(washingRoutes);
