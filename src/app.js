const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const columnRouter = require('./resources/columns/column.router');
const taskRouter = require('./resources/tasks/task.router');

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

app.use('/boards/', (req, res, next) => {
  next();
});
app.use((req, res, next) => {
  const parseFunction = object => {
    if (object === null) {
      return null;
    }
    const returnString = Object.keys(object).reduce((acc, i) => {
      let value = object[i];
      if (typeof object[i] === 'object') {
        value = parseFunction(object[i]);
      }
      return `${acc} ${Number.isInteger(parseInt(i, 10)) ? '' : i}${
        Number.isInteger(parseInt(i, 10)) ? '' : ':'
      }${value}`;
    }, '');
    const returnValue = Object.keys(object).length > 0 ? returnString : null;
    return returnValue;
  };
  const nullOrValue = value => {
    let returnValue = value;
    if (value !== null && typeof value === 'object' && value !== undefined) {
      returnValue = parseFunction(value);
    }
    return returnValue;
  };
  const url = req.originalUrl;
  let { params, body, method } = req;
  params = nullOrValue(params);
  body = nullOrValue(body);
  method = nullOrValue(method);
  console.log(
    `url:${url}; method:${method} query params:${params}; body:${body}`
  );
  next();
});

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
    process.stderr(err);
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
