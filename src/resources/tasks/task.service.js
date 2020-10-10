const tasksRepo = require('../tasks/task.memory.repository');

const getAll = type => tasksRepo.getAll(type);
const getById = (type, id) => tasksRepo.getTaskById(type, id);
const createTask = (type, object) => tasksRepo.createNewTask(type, object);
const updateById = (type, object) => tasksRepo.updateTaskById(type, object);
const deleteById = (type, id) => tasksRepo.deleteTaskById(type, id);

module.exports = { getAll, getById, createTask, updateById, deleteById };
