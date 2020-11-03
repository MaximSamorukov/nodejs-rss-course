const router = require('express').Router();
const loginService = require('../login/login.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const token = await loginService.getByLogin('users', login, password);
  if (!token) {
    res.status(403).send('Wrong login/password combination');
  } else {
    res.status(200).send({ token });
    return;
  }
});

module.exports = router;
