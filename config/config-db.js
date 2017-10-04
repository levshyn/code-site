/*
const nconfdb = require('nconf');
const path = require('path');

nconfdb.argv()
.env()
.file({ file: path.join(__dirname, 'config-db.json') });

module.exports = nconfdb;
*/

const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const log = require('../libs/log')(module);

let obj;
let temp;

try {
    obj = JSON.parse(fs.readFileSync(path.join(__dirname, config.get('configDbName'))));
    url = 'mongodb://' + obj.accountDb + ':' + obj.passwordDb +
    '@' + obj.urlDb + ':' + obj.portDb + '/' + obj.nameDb;
} catch (err) {
    log.error(err.message);
}

module.exports = {
  url: url
}

/*
fs.readFile(path.join(__dirname, 'config-db.json'), function (err, data) {
    if (err) { // error handling
      log.error(err.message);
    } else {
      var obj = JSON.parse(data);
      console.log(obj);

        url: 'mongodb://' + obj.accountDb + ':' + obj.passwordDb +
          '@' + obj.urlDb + ':' + obj.portDb + '/' + obj.nameDb;

    }
});
*/

/*
module.exports = {
  initialize: function (callback) {
    fs.readFile(path.join(__dirname, 'config-db.json'), function (err, data) {
      callback(err, data);
    });
  }
};
*/