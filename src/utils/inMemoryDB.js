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

const deleteEntryById = (type, id) => {
  const returnEntity = db[type].filter(item => item.id === id)[0];
  db[type] = db[type].filter(i => i.id !== id);
  return returnEntity;
};

const DB = {
  getAllEntities,
  getEntryById,
  createEntry,
  updateEntity,
  deleteEntryById
};

module.exports = DB;
