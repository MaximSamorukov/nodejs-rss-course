const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const columnRouter = require('./resources/columns/column.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./utils/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logger);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/tasks', taskRouter);
app.use('/columns', columnRouter);

app.use((err, req, res, next) => {
  const value = {
    message: 'Internal Server Error',
    err,
    req,
    res
  };
  if (err) {
    // process.stderr(err);
    res.status(500).send(value.message);
  }
  next();
});

process.on('uncaughtException', (err, origin) => {
  process.stderr(
    `Ups... caughtException: ${err};\n Exception origin: ${origin}`
  );
});

process.on('unhandledRejection', (reason, promise) => {
  process.stderr(`Unhandle rejection at: ${promise}, reason: ${reason}`);
});
module.exports = app;
