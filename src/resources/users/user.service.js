const usersRepo = require('../users/user.memory.repository');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../common/constants');
const bcrypt = require('bcrypt');

const getAll = type => usersRepo.getAll(type);
const getById = (type, id) => usersRepo.getUserById(type, id);
const createUser = (type, name, login, password) =>
  usersRepo.createNewUser(type, name, login, password);
const updateById = (type, id, name, login, password) =>
  usersRepo.updateUserById(type, id, name, login, password);
const deleteById = (type, id) => usersRepo.deleteUserById(type, id);
const getByLogin = async (type, loginf, password) => {
  const user = await usersRepo.getUserByLogin(type, loginf, password);

  if (!user) {
    return null;
  }
  const userValidation = await bcrypt.compare(password, user.password);
  if (!userValidation) {
    return null;
  }
  const { id, login } = user;
  const token = jwt.sign({ id, login }, SECRET);
  return token;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateById,
  deleteById,
  getByLogin
};
