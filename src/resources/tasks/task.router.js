const router = require('express').Router();
const tasksService = require('./task.service');
//  get All
router.route('/').get((req, res) => {
  const tasks = tasksService.getAll('boards');
  res.json(tasks);
});

//  get by id
router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const tasks = tasksService.getById('tasks', id);
  res.json(tasks);
});

//  create
router.route('/').post((req, res) => {
  const { title, order, description, userId, boardId, columnId } = req.body;
  const newTask = tasksService.createTask('tasks', {
    title,
    order,
    description,
    columnId,
    boardId,
    userId
  });
  res.json(newTask);
});

// update
router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const { title, order, description, userId, boardId, columnId } = req.body;
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

//  delete
router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  tasksService.deleteById('tasks', id);
  res.sendStatus(200);
});
module.exports = router;
