const boardsRepo = require('../boards/board.memory.repository');

const getAll = type => boardsRepo.getAll(type);
const getById = (type, id) => boardsRepo.getBoardById(type, id);
const createBoard = (type, title, columns) =>
  boardsRepo.createNewBoard(type, title, columns);
const updateById = (type, id, title, columns) =>
  boardsRepo.updateBoardById(type, id, title, columns);
const deleteById = (type, id) => boardsRepo.deleteBoardById(type, id);

module.exports = { getAll, getById, createBoard, updateById, deleteById };
