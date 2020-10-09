const DB = require('../../utils/inMemoryDB');
const getAll = type => {
  // TODO: mock implementation. should be replaced during task development
  const returnValue = DB.getAllEntities(type);
  return returnValue;
};

const getUserById = (type, id) => {
  const returnValue = DB.getEntryById(type, id);
  return returnValue;
};

const createNewUser = (type, name, login, password) => {
  const newUserFromDB = DB.createEntry(type, name, login, password);
  return newUserFromDB;
};

const updateUserById = (type, id, name, login, password) => {
  const updateUserFromDB = DB.updateEntity(type, id, name, login, password);
  return updateUserFromDB;
};

const deleteUserById = (type, id) => {
  const deletedUser = DB.deleteEntryById(type, id);
  return deletedUser;
};
module.exports = {
  getAll,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
};
