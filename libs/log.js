const winston = require('winston');
const config = require('../config/config');
const ENV = process.env.NODE_ENV;

console.log('ENV = ');
console.log(ENV);


function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/'); //отобразим метку с именем файла, который выводит сообщение

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV == 'development') ? 'debug' : 'error',
                label: path
            }),
            new winston.transports.File({
                level: 'info',
                // filename: './logs/info.log', // ./logs/info.log
                filename: './' + config.get('logDirName') + '/' + config.get('logFileName'), // ./logs/info.log
                handleExceptions: true,
                json: false, // true,
                maxsize: 5242880, // 5Mb
                maxFiles: 5,
                colorize: false,
                label: path
            })
        ]
    });
}

module.exports = getLogger;