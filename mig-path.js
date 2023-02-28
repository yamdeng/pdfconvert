"use strict";

const migPath = {};

/* 경로는 window, mac의 폴더 구분자가 틀림 */

// PDF 떨굴 앞의 경로
migPath.PREFIX_PATH_PDF_BODY = "/Users/yongsungahn/pdf";

// 기존 첨부파일의 경로 : prefix
migPath.PREFIX_PATH_OLD_ATTACH = "/Users/yongsungahn/attach/old";

// copy할 첨부파일의 경로 : prefix
migPath.PREFIX_PATH_NEW_ATTACH = "/Users/yongsungahn/attach/new";

module.exports = migPath;
