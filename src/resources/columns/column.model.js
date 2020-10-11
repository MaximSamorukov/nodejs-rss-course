const uuid = require('uuid');

class Column {
  constructor({ title = 'title', order = {} } = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
