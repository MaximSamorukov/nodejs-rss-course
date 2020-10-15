const log = require('./logger');
const { logger, errorLogger } = log;

const loggerRouter = (err, req, res, next, stream) => {
  if (!err) {
    logger(req, res, next, stream);
    return;
  }
  if (err) {
    errorLogger(err, next, stream);
  }
};

module.exports = loggerRouter;
