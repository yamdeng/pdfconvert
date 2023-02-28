"use strict";

const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "debug",
  format: format.json(),
  transports: [
    new transports.File({
      filename: "logs/mig.log",
    }),
  ],
  //...
});

module.exports = logger;
