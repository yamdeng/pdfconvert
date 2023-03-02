"use strict";

const process = require("process");
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf } = format;
const winston = require('winston');
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level} : ${message}`;
});

let baseSearchYear = '';

if (process.argv && process.argv.length) {
  if (process.argv.length > 2) {
    baseSearchYear = process.argv[2];
  }
}


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
      filename: `logs/mig-${baseSearchYear}.log`
    })
  ]
});

module.exports = logger;