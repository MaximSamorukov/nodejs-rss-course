const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Column = require('../resources/columns/column.model');
const Task = require('../resources/tasks/task.model');
const db = {
  users: [],
  boards: [],
  columns: [],
  tasks: []
};

// Tasks begin

const getEntryByIdTask = (type, boardId) => {
  const entityById = db[type].filter(i => i.boardId === boardId);
  return entityById;
};

const getTaskFromDBByOwnId = (type, { id }) => {
  const returnValue = db[type].filter(i => i.id === id);
  return returnValue;
};
const createEntryTask = (
  type,
  { id, title, order, description, userId, columnId }
) => {
  const boardId = id;
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  db[type].push(newTask);
  return newTask;
};

const updateEntityTask = (
  type,
  { id, title, order, description, boardId, userId, columnId }
) => {
  db[type].map(item => {
    if (item.id === id) {
      item.title = title;
      item.order = order;
      item.description = description;
      item.userId = userId;
      item.boardId = boardId;
      item.columnId = columnId;
      return item;
    }
    return item;
  });
  const updatedTask = db[type].filter(item => item.id === id);
  return updatedTask;
};

const deleteEntryByIdTask = (type, { id }) => {
  const returnEntity = db[type].filter(item => item.id === id);
  const value = returnEntity.length === 1 ? returnEntity : [];
  db[type] = db[type].filter(i => i.id !== id);
  return value;
};
//  Tasks end

// Columns begin
const getAllEntitiesColumn = type => {
  return db[type];
};

const getEntryByIdColumn = (type, id) => {
  const entityById = db[type].filter(i => i.id === id);
  return entityById[0];
};

const createEntryColumn = (type, title, order) => {
  const newColumn = new Column({ title, order });
  db[type].push(newColumn);
  return newColumn;
};

const updateEntityColumn = (type, id, title, order) => {
  db[type].map(item => {
    if (item.id === id) {
      item.title = title;
      item.order = order;
      return item;
    }
    return item;
  });
  const updatedColumn = db[type].filter(item => item.id === id)[0];
  return updatedColumn;
};

const deleteEntryByIdColumn = (type, id) => {
  const returnEntity = db[type].filter(item => item.id === id)[0];
  db[type] = db[type].filter(i => i.id !== id);
  return returnEntity;
};
//  Columns end

// Boards begin
const getAllEntitiesBoard = type => {
  return db[type];
};

const getEntryByIdBoard = (type, id) => {
  const entityById = db[type].filter(i => i.id === id);
  return entityById;
};

const createEntryBoard = (type, title, columns) => {
  const newBoard = new Board({ title, columns });
  db[type].push(newBoard);
  return newBoard;
};

const updateEntityBoard = (type, id, title, columns) => {
  db[type].map(item => {
    if (item.id === id) {
      item.title = title;
      item.columns = columns;
      return item;
    }
    return item;
  });
  const updatedBoard = db[type].filter(item => item.id === id)[0];
  return updatedBoard;
};

const deleteEntryByIdBoard = (type, id) => {
  const returnEntity = db[type].filter(item => item.id === id)[0];
  db[type] = db[type].filter(i => i.id !== id);
  db.tasks = db.tasks.filter(i => i.boardId !== id);
  return returnEntity;
};
//  Boards end

// Users begin
const getAllEntitiesUser = type => {
  return db[type];
};

const getEntryByIdUser = (type, id) => {
  const entityById = db[type].filter(i => i.id === id);
  return entityById[0];
};

const createEntryUser = (type, name, login, password) => {
  const newUser = new User({ name, login, password });
  db[type].push(newUser);
  return newUser;
};

const updateEntityUser = (type, id, name, login, password) => {
  db[type].map(item => {
    if (item.id === id) {
      item.name = name;
      item.login = login;
      item.password = password;
      return item;
    }
    return item;
  });
  const updatedUser = db[type].filter(item => item.id === id)[0];
  return updatedUser;
};

const deleteEntryByIdUser = (type, id) => {
  const returnEntity = db[type].filter(item => item.id === id)[0];
  db[type] = db[type].filter(i => i.id !== id);
  db.tasks = db.tasks.map(i => {
    if (i.userId === id) {
      i.userId = null;
      return i;
    }
    return i;
  });

  return returnEntity;
};
//  Users end
const DB = {
  getAllEntitiesUser,
  getEntryByIdUser,
  createEntryUser,
  updateEntityUser,
  deleteEntryByIdUser,

  getAllEntitiesBoard,
  getEntryByIdBoard,
  createEntryBoard,
  updateEntityBoard,
  deleteEntryByIdBoard,

  getAllEntitiesColumn,
  getEntryByIdColumn,
  createEntryColumn,
  updateEntityColumn,
  deleteEntryByIdColumn,

  getEntryByIdTask,
  createEntryTask,
  updateEntityTask,
  deleteEntryByIdTask,
  getTaskFromDBByOwnId
};

module.exports = DB;
