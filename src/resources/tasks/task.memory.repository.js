const DB = require('../../utils/inMemoryDB');
const getAll = (type, id) => {
  const returnValue = DB.getAllEntitiesTask(type, id);
  return returnValue;
};

const getTaskById = (type, boardId) => {
  const returnValue = DB.getEntryByIdTask(type, boardId);
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

const deleteTaskById = (type, object) => {
  const deletedTask = DB.deleteEntryByIdTask(type, object);
  return deletedTask;
};

const getTaskByOwnId = (type, object) => {
  const task = DB.getTaskFromDBByOwnId(type, object);
  return task;
};
module.exports = {
  getAll,
  getTaskById,
  createNewTask,
  updateTaskById,
  deleteTaskById,
  getTaskByOwnId
};
