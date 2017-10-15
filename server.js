// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Logger
const log = require('./libs/log')(module);
// Config
const config = require('./config/config');

// Get the API routes (Getting MEAN with Mongo, Express, Angular and Node. Chapter 6. Writing a REST API: Exposing the MongoDB database to the application, page 167)
const routesApi = require('./app_api/routes/index');

// Get a db model
require('./app_api/models/db');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.logger('dev'));

// Create link to Angular build directory
const distDir = __dirname + '/dist/';
app.use(express.static(distDir));

// Set our api routes
// app.use('/api', api);
app.use('/api', routesApi);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
});

// Error handling
app.use(function(req, res, next) {
    res.status(404);
    log.info('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function(req, res, next) {
    next(new Error('Random error!'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || config.get('port'); //'8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
// server.listen(port, () => console.log(`API running on localhost:${port}`));
server.listen(port, () => log.info(`API running on localhost:${port}`));