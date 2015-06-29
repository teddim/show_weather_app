var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.entry);
  res.send(req.body.entry);
});

module.exports = router;
