const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    surname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = washingSchema;
