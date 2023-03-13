const fs = require("fs");
const os = require("os");
const filePath =
  "/Users/yongsungahn/Project/pdfconvert/pty/201906251004560736.pty";

// 201906251004560736 : 본문존재하지 않음
// 202303130910410320 : 본문존재

let fileAppend;
try {
  fileAppend = fs.openSync(filePath, "a");
  fs.appendFileSync(fileAppend, "SDOCUF=C" + os.EOL, "utf8");
} catch (err) {
  /* Handle the error */
} finally {
  if (fileAppend !== undefined) fs.closeSync(fileAppend);
}
