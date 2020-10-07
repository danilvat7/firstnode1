var express = require('express');
var router = express.Router();
var imagedb = require('../data/imagedb');
var multiparty = require('multiparty');

router.get('/', function (req, res, next) {
  res.render('images');
});

router.post('/', function (req, res, next) {
  var form = new multiparty.Form();

  form.on('part', (part) => {
    imagedb.saveImage(part, part.byteCount, (err, id) => {
      if (err) next(err);
      res.redirect(`/images/show/${id}`);
    });
  });

  form.parse(req);
});

router.get('/show/:imageId', function (req, res, next) {
  var url = imagedb.getImageUri(req.params.imageId);
  res.render('showimage', { imageSrc: url });
});

module.exports = router;
