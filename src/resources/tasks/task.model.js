const uuid = require('uuid');

class Task {
  constructor({
    title = 'title',
    order = 0,
    description = 'description',
    userId = '#userId',
    boardId = '#boardId',
    columnId = '#columnId'
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
