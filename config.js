"use strict";

const config = {};

/* 경로는 window, mac의 폴더 구분자가 틀림 */

// oracle client install path local : C:\\instantclient_21_9
// oracle client install path real : ''
config.ORACLE_CLIENT_PATH = "";

// 쿼리 페이징 size
config.PAGE_SIZE = 1000;

// session_id
config.SESSION_ID = "284CAC562DED96F42DC8CF76F916A1BF";

// jobMaxCount = 100;
config.JOB_MAX_COUNT = 100;

// test pdf list
config.ERROR_PDF_DOCNUMBERS = [
  "201501031048420396",
  "201501031054380646",
  "201501031102360515",
  "201501031143210657",
  "201501031520530122",
  "201501031543260706",
  "201501050823550976",
  "201501050852000215",
  "201501050931510693",
  "201509070811140892"  
];

module.exports = config;
