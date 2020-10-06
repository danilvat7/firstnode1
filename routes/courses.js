var express = require('express');
var router = express.Router();
var db = require('../data/coursedb');

router.get('/', function (req, res, next) {
  db.queryCourses(function (err, documents) {
    if (err) return next(err);
    res.send(documents);
  });
});

router.put('/', function (req, res, next) {
  db.createCourses(function (err, documents) {
    if (err) return next(err);
    res.send(documents);
  });
});

module.exports = router;
