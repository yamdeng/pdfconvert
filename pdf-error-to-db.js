const process = require("process");
const fs = require("fs");
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

logger.info("======= pdf-error-to-db start =======");

(async () => {
  // connection setting start
  let connection1;
  try {
    connection1 = await oracledb.getConnection({
      user: userId,
      password: password,
      connectString: connectString,
    });
  } catch (e) {
    logger.error("oracle connection error : ", e);
    if (connection1) {
      connection1.close();
    }
    return;
  }
  // connection setting end

  try {
    // 1.특정 폴더 기준으로 파일 목록을 전체 가져온다
    const directoryPath = config.PDF_ERROR_PATH;
    const files = fs.readdirSync(directoryPath);
    for (let fileListIndex = 0; fileListIndex < files.length; fileListIndex++) {
      const fileName = files[fileListIndex];
      console.log(fileName);
      // '.' 문자까지 기준으로 DOCUNO를 추출한다
      const DOCUNO = fileName.substring(0, fileName.indexOf("."));

      // DOCUNO를 테이블에 insert 한다
      await connection1.execute(
        `INSERT INTO OFFICE5_PDF_ERROR (DOCUNO)
        VALUES(:DOCUNO)`,
        {
          DOCUNO: DOCUNO,
        },
        { autoCommit: true }
      );
    }
  } catch (e) {
    logger.error("error : ", e);
    if (connection1) {
      connection1.close();
    }
    return;
  }

  if (connection1) {
    connection1.close();
  }

  logger.info(`pdf-error-to-db complete`);
})();
