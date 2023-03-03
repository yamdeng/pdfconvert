const process = require("process");
const oracledb = require("oracledb");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const logger = require("./logger-pdf");
const config = require("./config");
const migPath = require("./mig-path");

const prefixPdfPath = migPath.PREFIX_PATH_PDF_BODY;

let baseSearchYear = "";
let baseDocuno = "";
if (process.argv && process.argv.length) {
  if (process.argv.length > 2) {
    baseSearchYear = process.argv[2];
    if (process.argv.length > 3) {
      baseDocuno = process.argv[3];
    }
  }
}

logger.info("======= pdf direct convert start =======");
logger.info("baseSearchYear : ", baseSearchYear);
logger.info("baseDocuno : ", baseDocuno);

const sessionId = config.SESSION_ID;

(async () => {
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
    const docList = [];
    const ERROR_PDF_DOCNUMBERS = config.ERROR_PDF_DOCNUMBERS;
    ERROR_PDF_DOCNUMBERS.forEach((docNumber) => {
      docList.push({ DOCUNO: docNumber });
    });
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

  logger.info(`${baseSearchYear} 년도 pdf convert 작업 complete`);
})();
