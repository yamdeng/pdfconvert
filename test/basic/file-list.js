const path = require("path");
const fs = require("fs");
const logger = require("../../logger-only");
const directoryPath = "/Users/yongsungahn/Project/pdfconvert";

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  files.forEach(function (file) {
    logger.info(file);
  });
});
