"use strict";

const config = {};

/* 경로는 window, mac의 폴더 구분자가 틀림 */

// oracle client install path local : C:\\instantclient_21_9
// oracle client install path real : ''
config.ORACLE_CLIENT_PATH = "";

// 쿼리 페이징 size
config.PAGE_SIZE = 1000;

// session_id
config.SESSION_ID = "35AE58CBB8A7436DE7F65A3F05DE55C5";

// jobMaxCount = 100;
config.JOB_MAX_COUNT = 100;

// test pdf list
config.ERROR_PDF_DOCNUMBERS = [
  "201411181752030274",
  "201411191428040827",
  "201411191431150996",
  "201411211410420843",
  "201411220957520656",
  "201411231011420285",
  "201411240957510253",
  "201411241009010187",
  "201408251728170509",
];

module.exports = config;
