const DB = require('../../utils/inMemoryDB');
const getAll = type => {
  const returnValue = DB.getAllEntitiesTask(type);
  return returnValue;
};

const getTaskById = (type, id) => {
  const returnValue = DB.getEntryByIdTask(type, id);
  return returnValue;
};

const createNewTask = (type, object) => {
  const newTaskFromDB = DB.createEntryTask(type, object);
  return newTaskFromDB;
};

const updateTaskById = (type, object) => {
  const updateTaskFromDB = DB.updateEntityTask(type, object);
  return updateTaskFromDB;
};

const deleteTaskById = (type, id) => {
  const deletedColumn = DB.deleteEntryByIdTask(type, id);
  return deletedColumn;
};
module.exports = {
  getAll,
  getTaskById,
  createNewTask,
  updateTaskById,
  deleteTaskById
};
