const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const columnRouter = require('./resources/columns/column.router');
const taskRouter = require('./resources/tasks/task.router');
const loggerRouter = require('./utils/loggerRouter');
const wrStream = require('./utils/stream');

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

app.use((req, res, next) => loggerRouter(false, req, res, next, wrStream));
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/tasks', taskRouter);
app.use('/columns', columnRouter);

// app.use((req, res, next) => {
//   throw new Error('ups');
//   next();
// });
app.use((err, req, res, next) => {
  // const value = {
  //   message: 'Internal Server Error',
  //   err,
  //   req,
  //   res
  // };
  loggerRouter(err, false, false, next, wrStream);
  res.status(500);
});

// app.use((req, res, next) => {
//   throw new Error('ups');
//   next();
// });

process.on('uncaughtException', (error, origin) => {
  const object = {
    error,
    origin
  };
  console.error("Call us 1. We'll help!!", object.error);
  // console.error(error.message);
  // process.exit(0);
  // if (error) {
  //   console.log('Error');
  // }
  // process.exit(1);
  // next();
  return;
});

process.on('unhandledRejection', (error, origin) => {
  const object = {
    error,
    origin
  };
  console.error("Call us 2. We'll help!!", object.error);
  return;
});
module.exports = app;
