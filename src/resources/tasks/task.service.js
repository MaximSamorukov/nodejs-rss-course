const tasksRepo = require('../tasks/task.memory.repository');

const getAll = (type, id) => tasksRepo.getAll(type, id);
const getById = (type, boardId) => tasksRepo.getTaskById(type, boardId);
const createTask = (type, object) => tasksRepo.createNewTask(type, object);
const updateById = (type, object) => tasksRepo.updateTaskById(type, object);
const deleteById = (type, object) => tasksRepo.deleteTaskById(type, object);
const getByOwnId = (type, object) => tasksRepo.getTaskByOwnId(type, object);
module.exports = {
  getAll,
  getById,
  createTask,
  updateById,
  deleteById,
  getByOwnId
};
