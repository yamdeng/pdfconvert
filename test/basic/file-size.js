const fs = require("fs");
const filePath =
  "/Users/yongsungahn/Project/pdfconvert/pty/202303130919020882.pty";

// 202303130919020882 : 32KB
// 201906251014140149.pty : 5KB
// 26KB > 30000

try {
  const stats = fs.statSync(filePath);
  const { size } = stats;
  console.log("fileSize : " + size);
  if (size > 30000) {
    console.log("file 26KB big");
  } else {
    console.log("file 26KB small");
  }
} catch (err) {
  console.error(err);
}
