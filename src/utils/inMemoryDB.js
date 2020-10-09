const User = require('../resources/users/user.model');

const db = {
  users: []
};

const getAllEntities = type => {
  return db[type];
};

const getEntryById = (type, id) => {
  const entityById = db[type].filter(i => i.id === id);
  return entityById;
};

const createEntry = (type, name, login, password) => {
  const newUser = new User({ name, login, password });
  db[type].push(newUser);
  return newUser;
};

const updateEntity = (type, id, name, login, password) => {
  db[type].map(item => {
    if (item.id === id) {
      item.name = name;
      item.login = login;
      item.password = password;
      return item;
    }
    return item;
  });
  const updatedUser = db[type].filter(item => item.id === id)[0];
  return updatedUser;
};

const DB = { getAllEntities, getEntryById, createEntry, updateEntity };

module.exports = DB;
