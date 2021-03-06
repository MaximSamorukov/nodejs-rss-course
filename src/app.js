const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const loggerRouter = require('./utils/loggerRouter');
const wrStream = require('./utils/stream');
const checkToken = require('./resources/login/checkToken');
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
// app.use(() => {
//   throw new Error('ups');
// });
app.use((req, res, next) => loggerRouter(false, req, res, next, wrStream));
app.use('/login', loginRouter);
app.use(checkToken);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/tasks', taskRouter);

app.use((err, req, res, next) => {
  loggerRouter(err, false, false, next, wrStream);
  res.sendStatus(500);
});

// app.use(() => {
//   throw new Error('ups');
// });

process.on('uncaughtException', (error, origin) => {
  const err = {
    error,
    origin
  };
  loggerRouter(err, false, false, false, wrStream);
  return;
});

process.on('unhandledRejection', (error, origin) => {
  const err = {
    error,
    origin
  };
  loggerRouter(err, false, false, false, wrStream);
  return;
});
module.exports = app;
