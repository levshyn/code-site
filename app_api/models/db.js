var mongoose = require('mongoose');
// Logger
const log = require('../../libs/log')(module);

// config for db
const configDb = require('../../config/config-db');
/*
const configDb = require('../../config/config-db').initialize(function (err, data) {
  if (err) {
    log.error(err.message);
    } else {
      var obj = JSON.parse(data);
      console.log(obj);

        url: 'mongodb://' + obj.accountDb + ':' + obj.passwordDb +
          '@' + obj.urlDb + ':' + obj.portDb + '/' + obj.nameDb;

    }
});
*/

// For SIGINT on Windows
var readLine = require("readline");

var gracefulShutdown;

// Define database connection string and use it to open Mongoose connection
// var dbURI = 'mongodb://localhost/Loc8r';
// var dbURI = configDb.url;
var dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI);

// Listening for SIGINT on Windows
if (process.platform === "win32") {
    console.log(`This platform is ${process.platform}`);
    // log.info('Application running on %s', process.platform);
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
}

// Reusable function to close Mongoose connection
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        // Don't show in log file!!! Why?!
        // log.info('Mongoose disconnected through %s', msg);
        callback();
    });
};

/* Listen to Node processes for termination or restart signals, and call
gracefulShutdown function when appropriate, passing a continuation callback */
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});
/*process.on("SIGINT", function () {
  // Graceful shutdown
  process.exit();
});
*/

// Listen for Mongoose connection events and output statuses to console (log)
mongoose.connection.on('connected', function() {
    // log.info('Mongoose connected to %s', dbURI);
    console.log('Mongoose connected to %s', dbURI);
});
mongoose.connection.on('error', function(err) {
    // log.error('Mongoose connection error: %s', err);
    console.log('Mongoose connection error: %s', err);
});
mongoose.connection.on('disconnected', function() {
    // log.info('Mongoose disconnected');
    console.log('Mongoose disconnected');
});

require('./snippets');