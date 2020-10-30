const router = require('express').Router();

router.route('/').post(async (req, res) => {
  // console.log(req.body);
  res.status(200).send(req.body); // .send('req.body');
});
// console.log(router);
module.exports = router;
