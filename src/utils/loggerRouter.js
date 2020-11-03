const log = require('./logger');
const { logger, errorLogger, loggerFatalError } = log;

const loggerRouter = (err, req, res, next, stream) => {
  if (Object.keys(err).toString() === 'error,origin') {
    loggerFatalError(err, next, stream);
    return;
  }
  if (!err) {
    logger(req, res, next, stream);
    return;
  }
  if (err) {
    errorLogger(err, next, stream);
    return;
  }
};

module.exports = loggerRouter;
