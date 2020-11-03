const router = require('express').Router();
// const UserDB = require('../users/user.model.db');
const usersService = require('../users/user.service');
// const bcrypt = require('bcrypt');
// const { SALTROUNDS } = require('../../common/constants');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const token = await usersService.getByLogin('users', login, password);
  if (!token) {
    res.status(403).send('Wrong login/password combination');
  } else {
    res.status(200).json(token);
  }
});

module.exports = router;
