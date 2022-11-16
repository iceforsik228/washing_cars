const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const washingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    talons: [
      {
        time: String,
        BoxesCount: Number,
      },
    ],
  },
  { timestamps: true },
);

module.exports = washingSchema;
