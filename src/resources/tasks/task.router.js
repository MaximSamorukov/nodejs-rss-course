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

module.exports = router;
