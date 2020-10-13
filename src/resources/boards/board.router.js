const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
//  get All
router.route('/').get((req, res) => {
  const boards = boardsService.getAll('boards');
  res.json(boards);
});

//  get by id
router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const board = boardsService.getById('boards', id);
  const status = board.length > 0 ? 200 : 404;
  res.status(status).json(board[0]);
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

//  get all tasks by board id
router.route('/:boardId/tasks').get((req, res) => {
  const { boardId } = req.params;
  const tasks = tasksService.getById('tasks', boardId);
  const status = tasks.length === 0 ? 404 : 200;
  res.status(status).json(tasks);
});

//  get task by own id
router.route('/:boardId/tasks/:id').get((req, res) => {
  const { boardId, id } = req.params;
  const tasks = tasksService.getByOwnId('tasks', { boardId, id });
  const status = tasks.length === 0 ? 404 : 200;
  res.status(status).json(tasks[0]);
});

//  create task by board id
router.route('/:id/tasks').post((req, res) => {
  const { id } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const newTask = tasksService.createTask('tasks', {
    id,
    title,
    order,
    description,
    columnId,
    userId
  });
  res.status(200).send(newTask);
});

// task update
router.route('/:boardId/tasks/:id').put((req, res) => {
  const { id, boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const updatedTask = tasksService.updateById('tasks', {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  res.json(updatedTask);
});

//  task delete
router.route('/:boardId/tasks/:id').delete((req, res) => {
  const { id, boardId } = req.params;
  const returnArray = tasksService.deleteById('tasks', { id, boardId });
  const status = returnArray.length === 0 ? 404 : 200;
  res.sendStatus(status);
});

//  delete board
router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  const returnValue = boardsService.deleteById('boards', id);
  const status = returnValue.length === 0 ? 404 : 204;
  res.sendStatus(status);
});

module.exports = router;
