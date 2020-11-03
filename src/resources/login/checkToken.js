const jwt = require('jsonwebtoken');
// const { SECRET } = require('../../common/constants');
const { JWT_SECRET_KEY } = require('../../common/config');

const checkToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      res.status(401).send('Unauthorized user!');
    } else {
      try {
        const result = jwt.verify(token, JWT_SECRET_KEY);
        console.log(result);
        return next();
      } catch (err) {
        res.status(401).send('Unauthorized user!');
      }
    }
  } else {
    res.status(401).send('Unauthorized user!');
  }
};
module.exports = checkToken;
