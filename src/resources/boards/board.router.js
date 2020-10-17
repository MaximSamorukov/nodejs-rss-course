const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
//  get All
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll('boards');
  res.json(boards);
});

//  get by id
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById('boards', id);
  if (board === null) {
    res.sendStatus(404);
  }
  res.status(200).json(board);
});

//  create
router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const newBoard = await boardsService.createBoard('boards', title, columns);
  res.json(newBoard);
});

// update
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  const updatedBoard = await boardsService.updateById(
    'boards',
    id,
    title,
    columns
  );
  res.json(updatedBoard);
});

//  get all tasks by board id
router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getById('tasks', boardId);
  const status = tasks.length === 0 ? 404 : 200;
  res.status(status).json(tasks);
});

//  get task by own id
router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { boardId, id } = req.params;
  const tasks = await tasksService.getByOwnId('tasks', { boardId, id });

  const status = tasks.length === 0 ? 404 : 200;
  res.status(status).json(tasks[0]);
});

//  create task by board id
router.route('/:id/tasks').post(async (req, res) => {
  const { id } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const newTask = await tasksService.createTask('tasks', {
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
router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { id, boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const updatedTask = await tasksService.updateById('tasks', {
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
router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { id, boardId } = req.params;
  const returnArray = await tasksService.deleteById('tasks', { id, boardId });
  const status = returnArray.length === 0 ? 404 : 200;
  res.sendStatus(status);
});

//  delete board
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const returnValue = await boardsService.deleteById('boards', id);
  const status = returnValue.length === 0 ? 404 : 204;
  res.sendStatus(status);
});

module.exports = router;
