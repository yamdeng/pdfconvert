const fs = require("fs");
const migPath = require("../../mig-path");
const oldPath = migPath.PREFIX_PATH_OLD_ATTACH;
const newPath = migPath.PREFIX_PATH_NEW_ATTACH;
const fileName = "1.docx";

try {
  fs.copyFileSync(`${oldPath}/${fileName}`, `${newPath}/${fileName}`);
} catch (e) {
  console.error("error: ", e);
}
