const process = require("process");
const fs = require("fs");
const path = require("path");
const oracledb = require("oracledb");
const logger = require("./logger-pty");
const config = require("./config");
const migPath = require("./mig-path");

const oldPath = migPath.PREFIX_PATH_OLD_ATTACH;
const backupPath = migPath.PREFIX_PATH_PTY_FILE_BACKUP;
const oracleClientInstallPath = config.ORACLE_CLIENT_PATH;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: oracleClientInstallPath });

// connection basic info
const password = "tkfkarhk8";
const userId = "GW5_OFFICE";
const serverIp = "61.40.65.3";
const serviceName = "orcl";
const connectString = serverIp + "/" + serviceName;

logger.info("======= pdf-pty start =======");

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
    // 1.특정 테이블에서 DOCUNO 목록을 가져옴
    const listSql = `SELECT *
      FROM OFFICE5_PDF_ERROR`;

    const listSqlDbResult = await connection1.execute(listSql, [], {});

    const errorList = listSqlDbResult.rows;
    logger.info("errorList size : " + errorList.length);

    if (!errorList || !errorList.length) {
      return;
    }

    // 1-1.조회해온 에러문서 목록만큼 반복한다
    for (
      let errorListIndex = 0;
      errorListIndex < errorList.length;
      errorListIndex++
    ) {
      const errorInfo = errorList[errorListIndex];
      const { DOCUNO } = errorInfo;
      const ptyFilePath = `${oldPath}${path.sep}${DOCUNO}.pty`;
      // 1.file 경로에 파일이 존재하는지 확인 : 존재하지 않으면 로그 기록하고 다음으로 넘어감 : DOCUNO
      const ptyFileExist = fs.existsSync(ptyFilePath);
      if (!ptyFileExist) {
        logger.error(`${ptyFilePath} not file exists`);
        continue;
      }

      let fileAppend;

      // 2.file을 오픈해서 특정 SDOCUF 문자가 존재하는지 확인해서 존재할 경우 로그 기록하고 다음으로 넘어감 : DOCUNO
      try {
        let ptyContent = fs.readFileSync(ptyFilePath, "utf8");
        if (!ptyContent) {
          ptyContent = "";
        }
        const searchIndex = ptyContent.indexOf("SDOCUF");
        const backupPtyFilePath = `${backupPath}${path.sep}${DOCUNO}.pty`;
        if (searchIndex === -1) {
          // 3.file이 존재하고 SDOCUF 문자가 존재하지 않는 경우만 특정 폴더로 백업함
          fs.copyFileSync(ptyFilePath, backupPtyFilePath);

          // 4.백업한 이후에 SDOCUF=C라고 마지막에 write 함
          fileAppend = fs.openSync(ptyFilePath, "a");
          fs.appendFileSync(fileAppend, "SDOCUF=C" + os.EOL, "utf8");
          logger.info(`${ptyFilePath} append success!!!`);
        } else {
          logger.info(`${ptyFilePath} file SDOCUF include`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (fileAppend !== undefined) fs.closeSync(fileAppend);
      }
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

  logger.info(`pdf-pty complete`);
})();
