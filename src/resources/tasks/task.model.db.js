const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

const TaskDB = model('Task', taskSchema);

module.exports = TaskDB;
