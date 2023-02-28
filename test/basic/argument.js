const process = require("process");
let year = "";
let docuno = "";
if (process.argv && process.argv.length) {
  if (process.argv.length > 2) {
    year = process.argv[2];
    if (process.argv.length > 3) {
      docuno = process.argv[3];
    }
  }
}

console.log("year : " + year);
console.log("docuno : " + docuno);
