"use strict";

const moment = require("moment");
const { createLogger, transports, format } = require("winston");
const winston = require('winston');

const logger = createLogger({
  level: "debug",
  format:format.combine(format.timestamp({ format: moment().format('YYYY-MM-DD HH:mm:ss.SSS') }),format.json()),
  transports: [
      new (winston.transports.Console)({
        timestamp: function() {
            return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        },
        level: 'debug'
    }),
    new transports.File({
      filename: "logs/mig.log",
      timestamp() {
          return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      }
    })
  ]
});

module.exports = logger;
