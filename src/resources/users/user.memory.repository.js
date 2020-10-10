const DB = require('../../utils/inMemoryDB');
const getAll = type => {
  // TODO: mock implementation. should be replaced during task development
  const returnValue = DB.getAllEntitiesUser(type);
  return returnValue;
};

const getUserById = (type, id) => {
  const returnValue = DB.getEntryByIdUser(type, id);
  return returnValue;
};

const createNewUser = (type, name, login, password) => {
  const newUserFromDB = DB.createEntryUser(type, name, login, password);
  return newUserFromDB;
};

const updateUserById = (type, id, name, login, password) => {
  const updateUserFromDB = DB.updateEntityUser(type, id, name, login, password);
  return updateUserFromDB;
};

const deleteUserById = (type, id) => {
  const deletedUser = DB.deleteEntryByIdUser(type, id);
  return deletedUser;
};
module.exports = {
  getAll,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
};
