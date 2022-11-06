const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const washingSchema = require('./models/washing');

mongoose.connect(process.env.MONGO_URI);
const app = express();

app.listen(process.env.PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(`listening port ${process.env.PORT}`);
});

const Washing = mongoose.model('Washing', washingSchema);

app.get('/', (req, res) => {
  const washing = [
    {
      id: 1,
      name: 'washing 1',
      price: 80,
      talons: [
        {
          time: '13:40',
        },
        {
          time: '14:40',
        },
        {
          time: '15:40',
        },
      ],
    },
    {
      id: 2,
      name: 'washing 2',
      price: 300,
      talons: [
        {
          time: '10:14',
        },
        {
          time: '12:30',
        },
      ],
    },
  ];
  res.json(washing);
});
