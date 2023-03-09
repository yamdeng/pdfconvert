const process = require("process");
const oracledb = require("oracledb");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const logger = require("./logger-error");
const config = require("./config");
const migPath = require("./mig-path");

const prefixPdfPath = migPath.PREFIX_PATH_PDF_BODY;
const oldPath = migPath.PREFIX_PATH_OLD_ATTACH;
const newPath = migPath.PREFIX_PATH_NEW_ATTACH;

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

let errorCase = "";
if (process.argv && process.argv.length) {
  if (process.argv.length > 2) {
    errorCase = process.argv[2];
  }
}

logger.info("======= error doc start =======");
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

const sessionId = config.SESSION_ID;

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

  // 최초 브라우저 공통 셋팅 start
  let browser;
  let page;
  let cookies;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    page = await browser.newPage();
    cookies = [
      {
        url: "http://gw.drcc.co.kr",
        name: "JSESSIONID",
        value: sessionId,
      },
    ];
    await page.setCookie(...cookies);
  } catch (e) {
    logger.error("browser init error : ", e);
    if (browser) {
      await browser.close();
    }
    if (connection1) {
      connection1.close();
    }
    if (connection2) {
      connection2.close();
    }
    return;
  }
  // 최초 브라우저 공통 셋팅 end

  let office5DocMasterList = [];

  try {
    // 1.office5 error table 조회
    const listSql = `SELECT m.docuno, m.userid, u.name AS USERNAME, m.deptcode, d.deptname, m.formcode, f.FORMNAME, m.regdate, m.title, m.ATTFILENUM, m.status
        FROM OA_EAPP_DOCUMAS M
          LEFT OUTER JOIN O0_USER_MAST u ON m.USERID = u.USERID
          LEFT OUTER JOIN O0_USER_DEPT d ON m.DEPTCODE = d.DEPTCODE
          LEFT OUTER JOIN OA_EAPP_FORM f ON m.FORMCODE  = f.FORMCODE
        WHERE M.docuno IN(
          SELECT DOCUNO
          FROM OFFICE5_MIG_JOB_FAIL f
          WHERE f.ERRORMESSAGE LIKE '${searchLikeSqlStr}%'
        )`;

    const listSqlDbResult = await connection1.execute(listSql, [], {
      fetchInfo: { ERRORMESSAGE: { type: oracledb.STRING } },
    });

    office5DocMasterList = listSqlDbResult.rows;
    logger.info(
      "error office5DocMasterList size : " + office5DocMasterList.length
    );
  } catch (e) {
    logger.error("step 0 error : ", e);
    if (browser) {
      await browser.close();
    }
    return;
  }

  if (!office5DocMasterList || !office5DocMasterList.length) {
    logger.error("office5DocMasterList size 0 out!!!!");
    return;
  }

  // 부서명 변환
  office5DocMasterList.forEach((info) => {
    if (info.DEPTNAME) {
      const deptName = info.DEPTNAME;
      const firstConvertDeptName = deptName.replace("dept.", "");
      const applyDeptName = firstConvertDeptName.replace("/C_DAERYUK", "");
      info.DEPTNAME = applyDeptName;
    }
  });

  // 문서 단위 실행 반복문
  for (
    let docListIndex = 0;
    docListIndex < office5DocMasterList.length;
    docListIndex++
  ) {
    // 문서 1건 단위 실행 start
    const docMasterInfo = office5DocMasterList[docListIndex];
    const { DOCUNO, ATTFILENUM } = docMasterInfo;

    let docUnitStep = 0; // 문서 1건 단위 step을 기록

    try {
      docUnitStep = 1; // step1. OA_EAPP_ATTACHFILE 테이블 조회
      const fileAttachSearchSql = `SELECT DOCUNO, FILECODE, FILESIZE, ORIFILENAME, NEWFILENAME
      FROM OA_EAPP_ATTACHFILE A
        WHERE docuno = :docuno `;
      const fileAttachSearchDbResult = await connection1.execute(
        fileAttachSearchSql,
        [DOCUNO]
      );

      docUnitStep = 2; // step2. 첨부파일 copy, table insert
      const fileAttachList = fileAttachSearchDbResult.rows;
      // 첨부파일 갯수가 동일하지 않으면 로그에 기록한다
      if (ATTFILENUM != fileAttachList.length) {
        logger.info(`${DOCUNO} doc attach count different`);
      }
      if (fileAttachList && fileAttachList.length) {
        for (
          let fileAttachListIndex = 0;
          fileAttachListIndex < fileAttachList.length;
          fileAttachListIndex++
        ) {
          const fileAttachInfo = fileAttachList[fileAttachListIndex];
          const { NEWFILENAME } = fileAttachInfo;
          fs.copyFileSync(
            `${oldPath}${path.sep}${DOCUNO}${path.sep}${NEWFILENAME}`,
            `${newPath}${path.sep}${NEWFILENAME}`
          );
          await connection2.execute(
            `INSERT INTO OFFICE5_MIG_ATTACH (DOCUNO, FILECODE, FILESIZE, ORIFILENAME, NEWFILENAME)
              VALUES (:DOCUNO, :FILECODE, :FILESIZE, :ORIFILENAME, :NEWFILENAME)`,
            fileAttachInfo,
            { autoCommit: true }
          );
        }
      }

      docUnitStep = 3; // step3. pdf 파일 생성
      const pdfReadTemplateUrl = `http://gw.drcc.co.kr/office/app/appPreview.do?docuno=${DOCUNO}`;
      await page.goto(pdfReadTemplateUrl, { waitUntil: "networkidle0" });
      const docunoYear = DOCUNO.substring(0, 4);
      const pdfCreateFullPath = `${prefixPdfPath}${path.sep}${docunoYear}${path.sep}${DOCUNO}.pdf`;
      await page.pdf({
        path: pdfCreateFullPath,
        printBackground: false,
        format: "A3",
      });

      docUnitStep = 4; // step4.개인함 조회
      const privateBoxSearchSql = `SELECT op.docuno, op.boxcode, op.userid, u.name AS username
      FROM OA_EAPP_PRIDOCU op
        LEFT OUTER JOIN O0_USER_MAST u ON op.userid = u.USERID
      WHERE op.DOCUNO = :docuno`;
      const privateBoxSearchDbResult = await connection1.execute(
        privateBoxSearchSql,
        [DOCUNO]
      );

      docUnitStep = 5; // step5.개인함 이관
      let privateBoxList = [];
      if (
        privateBoxSearchDbResult &&
        privateBoxSearchDbResult.rows &&
        privateBoxSearchDbResult.rows.length
      ) {
        privateBoxList = privateBoxSearchDbResult.rows;
        await connection2.executeMany(
          `INSERT INTO OFFICE5_BOX_PRIVATE (DOCUNO, USERID, USERNAME, BOXCODE)
          VALUES(:DOCUNO, :USERID, :USERNAME, :BOXCODE)`,
          privateBoxList,
          { autoCommit: true }
        );
      }

      docUnitStep = 6; // step6.부서함 조회
      const deptBoxSearchSql = `SELECT od.docuno, od.boxcode, od.deptcode, d1.deptname, od.SDEPTCODE, d2.deptname AS SDEPTNAME, od.SUSERID, u.name AS SUSERNAME, od.status, od.DRAFTNO
      FROM OA_EAPP_DEPTDOCU od 
        LEFT OUTER JOIN O0_USER_DEPT d1 ON od.DEPTCODE = d1.DEPTCODE
        LEFT OUTER JOIN O0_USER_DEPT d2 ON od.SDEPTCODE = d2.DEPTCODE
        LEFT OUTER JOIN O0_USER_MAST u ON od.SUSERID = u.USERID
      WHERE od.DOCUNO = :docuno`;
      const deptBoxSearchDbResult = await connection1.execute(
        deptBoxSearchSql,
        [DOCUNO]
      );

      docUnitStep = 7; // step7.부서함 이관
      let deptBoxList = [];
      if (
        deptBoxSearchDbResult &&
        deptBoxSearchDbResult.rows &&
        deptBoxSearchDbResult.rows.length
      ) {
        deptBoxList = deptBoxSearchDbResult.rows;
        // 부서명 변환
        deptBoxList.forEach((info) => {
          if (info.DEPTNAME) {
            const deptName = info.DEPTNAME;
            const firstConvertDeptName = deptName.replace("dept.", "");
            const applyDeptName = firstConvertDeptName.replace(
              "/C_DAERYUK",
              ""
            );
            info.DEPTNAME = applyDeptName;
          }

          if (info.SDEPTNAME) {
            const sdeptName = info.SDEPTNAME;
            const firstConvertSDeptName = sdeptName.replace("dept.", "");
            const applySDeptName = firstConvertSDeptName.replace(
              "/C_DAERYUK",
              ""
            );
            info.SDEPTNAME = applySDeptName;
          }
        });

        await connection2.executeMany(
          `INSERT INTO OFFICE5_BOX_DEPT (DOCUNO, BOXCODE, DEPTCODE, DEPTNAME, SDEPTCODE, SDEPTNAME, SUSERID, SUSERNAME, STATUS, DRAFTNO)
          VALUES(:DOCUNO, :BOXCODE, :DEPTCODE, :DEPTNAME, :SDEPTCODE, :SDEPTNAME, :SUSERID, :SUSERNAME, :STATUS, :DRAFTNO)`,
          deptBoxList,
          { autoCommit: true }
        );
      }

      docUnitStep = 8; // step9.max_number 테이블에 최신화

      docUnitStep = 9; // 마스터 정보 office6 table insert
      await connection2.execute(
        `INSERT INTO OFFICE5_MIG_APP (DOCUNO, USERID, USERNAME, DEPTCODE, DEPTNAME, FORMCODE, FORMNAME, REGDATE, TITLE, ATTFILENUM, STATUS)
        VALUES(:DOCUNO, :USERID, :USERNAME, :DEPTCODE, :DEPTNAME, :FORMCODE, :FORMNAME, :REGDATE, :TITLE, :ATTFILENUM, :STATUS)`,
        docMasterInfo,
        { autoCommit: true }
      );

      docUnitStep = 10; // office5에 완료 정보 저장
      await connection1.execute(
        `INSERT INTO OFFICE5_MIG_JOB_SUCCESS (DOCUNO)
        VALUES(:DOCUNO)`,
        { DOCUNO: DOCUNO },
        { autoCommit: true }
      );
      logger.info(`${DOCUNO} job success!!!`);
    } catch (e) {
      logger.error(`{${DOCUNO} singunit error, step${docUnitStep} : `, e);
      try {
        await connection1.execute(
          `INSERT INTO OFFICE5_MIG_JOB_FAIL (DOCUNO, JOBSTEP, ERRORMESSAGE)
          VALUES(:DOCUNO, :JOBSTEP, :ERRORMESSAGE)`,
          {
            DOCUNO: DOCUNO,
            JOBSTEP: docUnitStep,
            ERRORMESSAGE: e.stack,
          },
          { autoCommit: true }
        );
      } catch (e) {
        logger.error(`{${DOCUNO} table insert bug : `, e);
      }
    }
    // 문서 1건 단위 실행 end
  }

  if (browser) {
    await browser.close();
  }
  if (connection1) {
    connection1.close();
  }
  if (connection2) {
    connection2.close();
  }

  logger.info(`error-doc complete`);
})();
