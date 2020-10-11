const columnsRepo = require('../columns/column.memory.repository');

const getAll = type => columnsRepo.getAll(type);
const getById = (type, id) => columnsRepo.getColumnById(type, id);
const createColumn = (type, title, order) =>
  columnsRepo.createNewColumn(type, title, order);
const updateById = (type, id, title, order) =>
  columnsRepo.updateColumnById(type, id, title, order);
const deleteById = (type, id) => columnsRepo.deleteColumnById(type, id);

module.exports = { getAll, getById, createColumn, updateById, deleteById };
