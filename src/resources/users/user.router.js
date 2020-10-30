const router = require('express').Router();
const User = require('./user.model');
const UserDB = require('./user.model.db');
const usersService = require('./user.service');
const { crypt } = require('../../utils/bcrypt');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll('users');
  res.json(users.map(UserDB.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const users = await usersService.getById('users', id);
  res.json(UserDB.toResponse(users));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const hash = await crypt(password);
  const newUser = await usersService.createUser('users', name, login, hash);
  res.json(UserDB.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const updatedUser = await usersService.updateById(
    'users',
    id,
    name,
    login,
    password
  );

  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const deleteUser = await usersService.deleteById('users', id);
  res.json(UserDB.toResponse(deleteUser));
});

module.exports = router;
