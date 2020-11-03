const usersRepo = require('../users/user.memory.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const bcrypt = require('bcrypt');

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
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
  return token;
};

module.exports = {
  getByLogin
};
