"use strict";

const config = {};

/* 경로는 window, mac의 폴더 구분자가 틀림 */

// oracle client install path local : C:\\instantclient_21_9 
// oracle client install path real : ''
config.ORACLE_CLIENT_PATH = "";

// 쿼리 페이징 size
config.PAGE_SIZE = 1000;

// session_id
config.SESSION_ID = 'E8C353DFF5A9F303B234DDD4A2A31922';

// jobMaxCount = 100;
config.JOB_MAX_COUNT = 100;

module.exports = config;
