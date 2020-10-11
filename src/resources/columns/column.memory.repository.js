const DB = require('../../utils/inMemoryDB');
const getAll = type => {
  const returnValue = DB.getAllEntitiesColumn(type);
  return returnValue;
};

const getColumnById = (type, id) => {
  const returnValue = DB.getEntryByIdColumn(type, id);
  return returnValue;
};

const createNewColumn = (type, title, order) => {
  const newColumnFromDB = DB.createEntryColumn(type, title, order);
  return newColumnFromDB;
};

const updateColumnById = (type, id, title, order) => {
  const updateColumnFromDB = DB.updateEntityColumn(type, id, title, order);
  return updateColumnFromDB;
};

const deleteColumnById = (type, id) => {
  const deletedColumn = DB.deleteEntryByIdColumn(type, id);
  return deletedColumn;
};
module.exports = {
  getAll,
  getColumnById,
  createNewColumn,
  updateColumnById,
  deleteColumnById
};
