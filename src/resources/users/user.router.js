const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get((req, res) => {
  const users = usersService.getAll('users');
  res.json(users.map(User.toResponse));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const users = usersService.getById('users', id);
  res.json(User.toResponse(users));
});

router.route('/').post((req, res) => {
  const { name, login, password } = req.body;
  const newUser = usersService.createUser('users', name, login, password);
  res.json(User.toResponse(newUser));
});

router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const updatedUser = usersService.updateById(
    'users',
    id,
    name,
    login,
    password
  );

  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  const deleteUser = usersService.deleteById('users', id);
  res.json(User.toResponse(deleteUser));
});

module.exports = router;
