const fs = require("fs");
const filePath = "/Users/yongsungahn/Project/pdfconvert/mig-path.js";
const fileExist = fs.existsSync(filePath);
console.log(`${filePath} : ${fileExist}`);
