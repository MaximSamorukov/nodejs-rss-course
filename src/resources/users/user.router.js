const router = require('express').Router();
const User = require('./user.model');
const UserDB = require('./user.model.db');
const usersService = require('./user.service');
const bcrypt = require('bcrypt');
const { SALTROUNDS } = require('../../common/constants');

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
  const hash = await bcrypt.hash(password, SALTROUNDS);
  const newUser = usersService.createUser('users', name, login, hash);
  res.json(UserDB.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const hash = await bcrypt.hash(password, SALTROUNDS);
  const updatedUser = await usersService.updateById(
    'users',
    id,
    name,
    login,
    hash
  );

  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const deleteUser = await usersService.deleteById('users', id);
  res.json(UserDB.toResponse(deleteUser));
});

module.exports = router;
