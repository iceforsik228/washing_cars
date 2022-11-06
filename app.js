const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const washingSchema = require('./models/washing');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

const Washing = mongoose.model('Washing', washingSchema);

app.get('/api/washing', (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' });
  Washing.find().then((washing) => res.status(200).json(washing));
});

app.get('/api/washing/:id', (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' });
  Washing.findById(req.params.id).then((washing) => res.status(200).json(washing));
});

app.post('/api/add-washing', (req, res) => {
  const { name, description, distance, talons } = req.body;
  const washing = new Washing({ name, description, distance, talons });
  washing
    .save()
    .then((wash) => res.status(200).json({ message: 'success' }))
    .catch((error) => {
      console.log(error);
    });
});
