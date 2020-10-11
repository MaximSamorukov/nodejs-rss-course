const uuid = require('uuid');

class Board {
  constructor({ title = 'title', columns = [] } = {}) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
