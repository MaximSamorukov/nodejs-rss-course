const DB = require('../../utils/inMemoryDB');
const getAll = type => {
  const returnValue = DB.getAllEntitiesBoard(type);
  return returnValue;
};

const getBoardById = (type, id) => {
  const returnValue = DB.getEntryByIdBoard(type, id);
  return returnValue;
};

const createNewBoard = (type, title, columns) => {
  const newBoardFromDB = DB.createEntryBoard(type, title, columns);
  return newBoardFromDB;
};

const updateBoardById = (type, id, title, columns) => {
  const updateBoardFromDB = DB.updateEntityBoard(type, id, title, columns);
  return updateBoardFromDB;
};

const deleteBoardById = (type, id) => {
  const deletedBoard = DB.deleteEntryByIdBoard(type, id);
  return deletedBoard;
};
module.exports = {
  getAll,
  getBoardById,
  createNewBoard,
  updateBoardById,
  deleteBoardById
};
