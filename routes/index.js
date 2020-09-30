var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const model = {
    title: 'Azure',
    //  message: process.env.MESSAGE || 'This is evelopment',
  };
  res.render('index', model);
});

module.exports = router;
