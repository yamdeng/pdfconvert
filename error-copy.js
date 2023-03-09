const process = require("process");
const oracledb = require("oracledb");
const logger = require("./logger-error");
const config = require("./config");

const oracleClientInstallPath = config.ORACLE_CLIENT_PATH;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: oracleClientInstallPath });

// connection basic info
const password = "tkfkarhk8";
const userId = "GW5_OFFICE";
const serverIp = "61.40.65.3";
const serviceName = "orcl";
const connectString = serverIp + "/" + serviceName;

// connection basic info 2
const password2 = "tkddn2363";
const userId2 = "gwdb";
const serverIp2 = "61.40.65.15";
const serviceName2 = "orcl";
const connectString2 = serverIp2 + "/" + serviceName2;

let errorCase = "1";
if (process.argv && process.argv.length) {
  if (process.argv.length > 2) {
    errorCase = process.argv[2];
  }
}

logger.info("======= error copy start =======");
logger.info("errorCase : ", errorCase);

let searchLikeSqlStr = "Error: ENOENT";

if (errorCase === "1") {
  searchLikeSqlStr = "Error: ENOENT";
} else if (errorCase === "2") {
  searchLikeSqlStr = "Error: net::ERR_CONNECTION_REFUSED";
} else if (errorCase === "3") {
  searchLikeSqlStr = "TimeoutError: Navigation timeout";
} else if (errorCase === "4") {
  searchLikeSqlStr = "TimeoutError: waiting for";
} else if (errorCase === "5") {
  searchLikeSqlStr =
    "Error: ORA-00001: 무결성 제약 조건(GWDB.OFFICE5_MIG_ATTACH_PK";
} else if (errorCase === "6") {
  searchLikeSqlStr = "Error: net::ERR_CONNECTION_RESET";
}

(async () => {
  // multiple connection setting start
  let connection1;
  let connection2;
  try {
    connection1 = await oracledb.getConnection({
      user: userId,
      password: password,
      connectString: connectString,
    });

    connection2 = await oracledb.getConnection({
      user: userId2,
      password: password2,
      connectString: connectString2,
    });
  } catch (e) {
    logger.error("oracle connection error : ", e);
    if (connection1) {
      connection1.close();
    }
    return;
  }
  // multiple connection setting end

  try {
    // 1.office5 error table 조회
    const listSql = `SELECT *
      FROM OFFICE5_MIG_JOB_FAIL f
      WHERE f.ERRORMESSAGE LIKE '${searchLikeSqlStr}%'`;

    const listSqlDbResult = await connection1.execute(listSql, [], {
      fetchInfo: { ERRORMESSAGE: { type: oracledb.STRING } },
    });

    const errorList = listSqlDbResult.rows;
    logger.info("errorList size : " + errorList.length);

    if (!errorList || !errorList.length) {
      return;
    }

    // 문서 단위 실행 반복문
    for (
      let errorListIndex = 0;
      errorListIndex < errorList.length;
      errorListIndex++
    ) {
      const errorInfo = errorList[errorListIndex];
      const { DOCUNO, JOBSTEP, ERRORMESSAGE } = errorInfo;
      await connection2.execute(
        `INSERT INTO OFFICE5_MIG_JOB_FAIL (DOCUNO, JOBSTEP, ERRORMESSAGE)
        VALUES(:DOCUNO, :JOBSTEP, :ERRORMESSAGE)`,
        {
          DOCUNO: DOCUNO,
          JOBSTEP: JOBSTEP,
          ERRORMESSAGE: ERRORMESSAGE,
        },
        { autoCommit: true }
      );
    }
  } catch (e) {
    logger.error("error : ", e);
    if (connection1) {
      connection1.close();
    }
    if (connection2) {
      connection2.close();
    }
    return;
  }

  if (connection1) {
    connection1.close();
  }
  if (connection2) {
    connection2.close();
  }

  logger.info(`error copy complete`);
})();
