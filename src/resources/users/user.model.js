const uuid = require('uuid');

class User {
  constructor({
    name = 'name',
    login = 'login',
    password = 'complex-password'
  } = {}) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
