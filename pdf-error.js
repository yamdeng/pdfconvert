const process = require("process");
const oracledb = require("oracledb");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const logger = require("./logger-pdf");
const config = require("./config");
const migPath = require("./mig-path");

const prefixPdfPath = migPath.PREFIX_PATH_PDF_BODY;

const oracleClientInstallPath = config.ORACLE_CLIENT_PATH;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: oracleClientInstallPath });

// connection basic info
const password = "tkfkarhk8";
const userId = "GW5_OFFICE";
const serverIp = "61.40.65.3";
const serviceName = "orcl";
const connectString = serverIp + "/" + serviceName;

logger.info("======= pdf-error start =======");

const sessionId = config.SESSION_ID;

(async () => {
  // single connection setting start
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
  // single connection setting end

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
    return;
  }
  // 최초 브라우저 공통 셋팅 end

  try {
    // 1.년도 기준 작업완료된 docno 목록 가져오기
    const successDocSearchSql = `SELECT DOCUNO
    FROM OFFICE5_PDF_ERROR`;
    const docListDbResult = await connection1.execute(successDocSearchSql, []);

    const docList = docListDbResult.rows;
    logger.info("docList size : " + docList.length);

    // 반복문 start
    for (let docListIndex = 0; docListIndex < docList.length; docListIndex++) {
      const docInfo = docList[docListIndex];
      const { DOCUNO } = docInfo;
      const pdfReadTemplateUrl = `http://gw.drcc.co.kr/office/app/appPreview.do?docuno=${DOCUNO}`;
      await page.goto(pdfReadTemplateUrl, { waitUntil: "networkidle0" });
      const docunoYear = DOCUNO.substring(0, 4);
      const pdfCreateFullPath = `${prefixPdfPath}${path.sep}${docunoYear}${path.sep}${DOCUNO}.pdf`;
      await page.pdf({
        path: pdfCreateFullPath,
        printBackground: false,
        format: "A3",
      });
      logger.info(`${DOCUNO} number pdf success!!!`);
    }
    // 반복문 end
  } catch (e) {
    logger.error("pdf convert error : ", e);
  }

  if (browser) {
    await browser.close();
  }
  if (connection1) {
    connection1.close();
  }

  logger.info(`pdf-error complete`);
})();
