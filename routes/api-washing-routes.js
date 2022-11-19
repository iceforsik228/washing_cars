const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const washingSchema = require('../models/washing');

const Washing = mongoose.model('Washing', washingSchema);

router.get('/api/washing', (req, res) => {
  Washing.find((err, washings) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(washings);
  });
});

router.post('/api/washing', (req, res) => {
  const { name, description, distance, talons } = req.body;
  const washing = new Washing({ name, description, distance, talons });
  washing
    .save()
    .then((wash) => res.status(200).json({ message: 'success' }))
    .catch((error) => {
      console.log(error);
    });
});

router.get('/api/washing/:id', (req, res) => {
  Washing.findById(req.params.id, (err, washing) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(washing);
  });
});

router.put('/api/washing/:id', (req, res) => {
  const { boxesCount } = req.body;
  if (boxesCount < 0 || boxesCount > 100) {
    res.status(500).json({ err: 'frontend krivoy' });
  }
  Washing.findById(req.params.id, (err, washing) => {
    if (err) return res.status(500).json(err);
    washing['talons'].forEach((element) => {
      element['boxesCount'] = boxesCount;
    });
    washing.save((err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(washing);
    });
  });
});

router.put('/api/washing/:id/:idTime', (req, res) => {
  const { boxesCount } = req.body;
  if (boxesCount < 0 || boxesCount > 100) {
    res.status(500).json({ err: 'frontend krivoy' });
  }
  Washing.findById(req.params.id, (err, washing) => {
    if (err) return res.status(500).json(err);
    washing['talons'][req.params.idTime]['boxesCount'] = boxesCount;
    washing.save((err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(washing);
    });
  });
});

router.put('/api/washing/talon/:id/:idTime', (req, res) => {
  Washing.findById(req.params.id, (err, washing) => {
    if (err) return res.status(500).send(err);

    if (washing['talons'][req.params.idTime]['boxesCount'] > 0) {
      washing['talons'][req.params.idTime]['boxesCount']--;
    } else {
      res.status(500).json({ err: 'frontend krivoy' });
    }
    washing.save((err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(washing);
    });
  });
});

module.exports = router;
