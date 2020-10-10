const router = require('express').Router();
const boardsService = require('./board.service');
//  get All
router.route('/').get((req, res) => {
  const boards = boardsService.getAll('boards');
  res.json(boards);
});

//  get by id
router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const board = boardsService.getById('boards', id);
  res.json(board);
});

//  create
router.route('/').post((req, res) => {
  const { title, columns } = req.body;
  const newBoard = boardsService.createBoard('boards', title, columns);
  res.json(newBoard);
});

// update
router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  const updatedBoard = boardsService.updateById('boards', id, title, columns);
  res.json(updatedBoard);
});

//  delete
router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  boardsService.deleteById('boards', id);
  res.sendStatus(200);
});
module.exports = router;
