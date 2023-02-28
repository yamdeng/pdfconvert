"use strict";

const migPath = {};

/* 경로는 window, mac의 폴더 구분자가 틀림 */


// PDF 떨굴 앞의 경로
// /Users/yongsungahn/pdf, D:\\mig-data\\pdf
// office5 os server : G:\\mig-data\\pdf
migPath.PREFIX_PATH_PDF_BODY = "G:\\mig-data\\pdf";

// 기존 첨부파일의 경로 : prefix
// /Users/yongsungahn/attach/old, D:\\mig-data\\attach\\old
// office5 os server : D:\\SpeedOffice\\data\\C_DAERYUK\\app\\temp
migPath.PREFIX_PATH_OLD_ATTACH = "G:\\mig-data\\old";

// copy할 첨부파일의 경로 : prefix
// /Users/yongsungahn/attach/new, D:\\mig-data\\attach\\new
// office5 os server : G:\\mig-data\\attach
migPath.PREFIX_PATH_NEW_ATTACH = "G:\\mig-data\\attach";

module.exports = migPath;
