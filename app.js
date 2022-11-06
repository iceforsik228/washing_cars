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
  res.header({ 'Access-Control-Allow-Origin': '*' });
  Washing.find().then((washing) => res.status(200).json(washing));
});

app.get('/add-washing', (req, res) => {
  const washing = new Washing({
    name: 'washing',
    description: 'qweqwe',
    distance: 123,
    talons: [1, 2, 3],
  });
  washing.save((error, data) => {
    if (error) console.log(error);
  });
  res.json({ message: 'success' });
});
