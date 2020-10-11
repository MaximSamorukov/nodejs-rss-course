const router = require('express').Router();
const columnsService = require('./column.service');
//  get All
router.route('/').get((req, res) => {
  const columns = columnsService.getAll('columns');
  res.json(columns);
});

//  get by id
router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const column = columnsService.getById('columns', id);
  res.json(column);
});

//  create
router.route('/').post((req, res) => {
  const { title, order } = req.body;
  const newColumn = columnsService.createColumn('columns', title, order);
  res.json(newColumn);
});

// update
router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const { title, order } = req.body;
  const updatedColumn = columnsService.updateById('columns', id, title, order);
  res.json(updatedColumn);
});

//  delete
router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  const deleteColumn = columnsService.deleteById('columns', id);
  res.json(deleteColumn);
});
module.exports = router;
