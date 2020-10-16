const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  login: String,
  password: String,
  id: {
    type: String,
    default: uuid
  }
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const UserDB = model('User', userSchema);

module.exports = UserDB;
