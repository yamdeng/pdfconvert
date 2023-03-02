"use strict";

const moment = require("moment");
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf } = format;
const winston = require('winston');
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level} : ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
      new (winston.transports.Console)({
        level: 'debug'
    }),
    new transports.File({
      filename: "logs/mig.log"
    })
  ]
});

module.exports = logger;