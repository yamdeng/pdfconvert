const fs = require("fs");
const filePath =
  "/Users/yongsungahn/Project/pdfconvert/pty/201906251004560736.pty";

// 201906251004560736 : SDOCUF 존재않함
// 201805041433160150 : SDOCUF 존재함
try {
  const data = fs.readFileSync(filePath, "utf8");
  const searchIndex = data.indexOf("SDOCUF");
  if (searchIndex !== -1) {
    console.log("file SDOCUF include");
  } else {
    console.log("file SDOCUF exclude");
  }
} catch (err) {
  console.error(err);
}
