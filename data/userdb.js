var tedious = require('tedious');

var Connection = tedious.Connection;
var Request = tedious.Request;

var config = {
  server: 'firstnode1sql.database.windows.net',
  options: {
    database: 'firstnodedb',
    encrypt: true,
    rowCollectionOnRequestCompletion: true,
  },
  authentication: {
    type: 'default',
    options: {
      userName: 'admin',
      password: 'Qazwsx1!',
    },
  },
};

var createUsers = function (cb) {
  var connection = new Connection(config);

  connection.on('connect', (err) => {
    if (err) {
      cb(err);
    } else {
      var request = new Request(
        `
                INSERT INTO users (name, email) VALUES ('Scott', 'scott@odetocode.com') 
                INSERT INTO users (name, email) VALUES ('Allen', 'allen@odetocode.com')
                `,
        function (err, rowCount) {
          cb(err, rowCount);
        }
      );
      connection.execSql(request);
    }
  });
};

var queryUsers = function (cb) {
  var connection = new Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      cb(err);
    } else {
      var request = new Request('SELECT * FROM users', function (
        err,
        rowCount,
        rows
      ) {
        cb(err, rowCount, rows);
      });
      connection.execSql(request);
    }
  });
};

module.exports = {
  createUsers,
  queryUsers,
};
