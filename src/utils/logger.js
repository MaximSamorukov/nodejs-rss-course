const logger = (req, res, next) => {
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
};

module.exports = logger;
