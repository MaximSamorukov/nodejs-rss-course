const bcrypt = require('bcrypt');
const saltRounds = 10;

const crypt = async password => await bcrypt.hash(password, saltRounds);

const compare = async (hash, password) => await bcrypt.compare(password, hash);

const cryptTools = {
  crypt,
  compare
};

module.exports = cryptTools;
