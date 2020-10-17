const date = require('date-and-time');

const errorLogger = (error, next, stream) => {
  // console.log("Somethis's wrong!!!");
  const dateString = date.format(new Date(), 'Y-M-D-HH-mm-SS-SSS');
  const message = `=> error: ${dateString}; "Somethis's wrong!!!" Error: ${error.message}`;
  console.log(message);
  stream()(`${message}\n`);
  next();
};

const logger = (req, res, next, stream) => {
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
  const dateString = date.format(new Date(), 'Y-M-D-HH-mm-SS-SSS');
  const message = `=> process: ${dateString}; url:${url}; method:${method} query params:${params}; body:${body}`;
  console.log(message);
  stream()(`${message}\n`);
  next();
};

const loggerFatalError = ({ error }, next, stream) => {
  const dateString = date.format(new Date(), 'Y-M-D-HH-mm-SS-SSS');
  const message = `=> error: ${dateString}; "Somethis's wrong!!!" Error: ${error}.`;
  console.log(message);
  stream()(`${message}\n`);
  return;
};

const log = {
  logger,
  errorLogger,
  loggerFatalError
};
module.exports = log;
