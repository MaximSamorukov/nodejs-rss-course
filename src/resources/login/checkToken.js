const jwt = require('jsonwebtoken');
const { SECRET } = require('../../common/constants');

const checkToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    // const tokenString = req.header('Authorization');
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      res.status(401).send('Unauthorized user1!');
    } else {
      const result = jwt.verify(token, SECRET);
      console.log(result);
      return next();
    }
  }
  res.status(401).send('Unauthorized user2!');
};

module.exports = checkToken;
