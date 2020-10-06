var sampleData = require('./sampleCourses');
var docdb = require('documentdb');
var async = require('async');

var config = {
  host: 'https://firstnodedb.documents.azure.com:443/',
  auth: {
    masterKey:
      'EYBpodG5AjcRGQNlIK7gGetYa6QPz7vowW9YCy3Gawws76upwVGABd1aO5xCQjGPJy1QDPcGGAAQiDZq8Q3dRA==',
  },
};

var client = new docdb.DocumentClient(config.host, config.auth);
var coursesLink = docdb.UriFactory.createDocumentCollectionUri(
  'firstnode',
  'courses'
);

var createCourses = function (callback) {
  var documents = [];
  async.forEachOf(
    sampleData,
    (course, key, next) => {
      client.createDocument(coursesLink, course, (err, document) => {
        if (err) return next(err);
        documents.push(document);
        next();
      });
    },
    (err) => callback(err, documents)
  );
};

var queryCourses = function (callback) {
  var querySpec = {
    query: 'SELECT * FROM c',
    parameters: [],
  };

  client
    .queryDocuments(coursesLink, querySpec, { enableCrossPartitionQuery: true })
    .toArray((err, results) => {
      callback(err, results);
    });
};

module.exports = {
  createCourses: createCourses,
  queryCourses: queryCourses,
};
