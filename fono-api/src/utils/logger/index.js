"use strict";
exports.__esModule = true;
var winston = require("winston");
var appConfig_1 = require("../../config/appConfig");
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
var level = function () {
    return appConfig_1["default"].app.isDevelopment ? 'debug' : 'warn';
};
var colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'magenta',
    debug: 'green'
};
winston.addColors(colors);
var format = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston.format.colorize({ all: true }), winston.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); }));
var transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),
    new winston.transports.File({ filename: 'logs/all.log' })
];
var Logger = winston.createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports: transports
});
exports["default"] = Logger;
