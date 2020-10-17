const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const boardSchema = new Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: [{ title: String, order: Number }]
});

const BoardDB = model('Board', boardSchema);

module.exports = BoardDB;
