const usersRepo = require('../users/user.memory.repository');

const getAll = type => usersRepo.getAll(type);
const getById = (type, id) => usersRepo.getUserById(type, id);
const createUser = (type, name, login, password) =>
  usersRepo.createNewUser(type, name, login, password);
const updateById = (type, id, name, login, password) =>
  usersRepo.updateUserById(type, id, name, login, password);
const deleteById = (type, id) => usersRepo.deleteUserById(type, id);

module.exports = {
  getAll,
  getById,
  createUser,
  updateById,
  deleteById
};
