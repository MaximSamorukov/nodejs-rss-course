const UserDB = require('../resources/users/user.model.db');
const BoardDB = require('../resources/boards/board.model.db');
const TaskDB = require('../resources/tasks/task.model.db');

// Tasks begin

const getEntryByIdTask = (type, boardId) => TaskDB.find({ boardId });

const getTaskFromDBByOwnId = (type, { id }) => TaskDB.find({ id });

const createEntryTask = (
  type,
  { id, title, order, description, userId, columnId }
) => {
  const boardId = id;
  const newTaskDB = new TaskDB({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  newTaskDB.save();
  return newTaskDB;
};

const updateEntityTask = async (
  type,
  { id, title, order, description, boardId, userId, columnId }
) => {
  await TaskDB.updateOne(
    { id },
    { title, order, description, boardId, userId, columnId }
  );
  const taskToReturnAfterUpdate = await TaskDB.findOne({ id });
  return taskToReturnAfterUpdate;
};

const deleteEntryByIdTask = async (type, { id }) => {
  const taskToDelete = await TaskDB.find({ id });
  const returnValueAfterDelete = await TaskDB.deleteOne({ id });
  if (returnValueAfterDelete === 0) {
    throw new Error('We have problems with deletion, Huston!');
  }
  return taskToDelete;
};
//  Tasks end

// Boards begin
const getAllEntitiesBoard = () => BoardDB.find({});

const getEntryByIdBoard = async (type, id) => await BoardDB.findOne({ id });

const createEntryBoard = (type, title, columns) => {
  const newBoardDB = new BoardDB({ title, columns });
  newBoardDB.save();
  return newBoardDB;
};

const updateEntityBoard = async (type, id, title, columns) => {
  const itemToReturn = await BoardDB.findOne({ id });
  await BoardDB.updateOne({ id }, { title, columns });
  return itemToReturn;
};

const deleteEntryByIdBoard = async (type, id) => {
  await TaskDB.deleteMany({ boardId: id });
  const boardToDelete = await BoardDB.find({ id });
  const returnValueAfterDelete = await BoardDB.deleteOne({ id });
  if (returnValueAfterDelete === 0) {
    throw new Error('We have problems with deletion, Huston!');
  }
  return boardToDelete;
};
//  Boards end

// Users begin
const getAllEntitiesUser = () => UserDB.find({});

const getEntryByIdUser = async (type, id) => UserDB.findOne({ id });

const createEntryUser = (type, name, login, password) => {
  const newUserDB = new UserDB({ name, login, password });
  newUserDB.save();
  return newUserDB;
};

const updateEntityUser = (type, id, name, login, password) =>
  UserDB.updateOne({ id }, { name, login, password });

const deleteEntryByIdUser = async (type, id) => {
  await TaskDB.updateMany({ userId: id }, { userId: null });
  const userToDelete = await UserDB.findOne({ id });
  const returnValueAfterDelete = await UserDB.deleteOne({ id });
  if (returnValueAfterDelete.deletedCount === 0) {
    throw new Error('We have problems with deletion, Huston!');
  }
  return userToDelete;
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

  getEntryByIdTask,
  createEntryTask,
  updateEntityTask,
  deleteEntryByIdTask,
  getTaskFromDBByOwnId
};

module.exports = DB;
