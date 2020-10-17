/* eslint no-sync: "error"*/
/* eslint no-sync: ["error", { allowAtRootLevel: true }]*/

const fs = require('fs');
const date = require('date-and-time');
const path = `./src/utils/logs/log-${date.format(
  new Date(),
  'Y-M-D-HH-mm-SS-SSS'
)}.txt`;
fs.appendFileSync(
  path,
  `Log began at ${date.format(new Date(), 'Y-M-D-HH-mm-SS-SSS')}\n`,
  'utf8'
);
const wrStream = () => data =>
  fs.appendFile(path, data, 'utf8', err => {
    if (err) {
      throw new Error(err);
    }
  });

module.exports = wrStream;
