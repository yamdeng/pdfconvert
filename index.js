const process = require("process");
const logger = require("./logger");
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

logger.info("======= mig start =======");
logger.info("baseSearchYear : ", baseSearchYear);
logger.info("baseDocuno : ", baseDocuno);

// 1.페이징 쿼리 조회 시작 기준이되는 작업을 완료한 docuno를 테이블을 조회해서 가져온다 : max(docuno)
// table : year, last_docuno ---> update query로 수행 ---> 사전에  dml.sql로 2014 ~ 2023까지 미리 데이터 넣어 놓음
// table : 성공에 대한 정보를 넣음

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  // Create a new page
  const page = await browser.newPage();

  const cookies = [
    {
      url: "http://gw.drcc.co.kr",
      name: "JSESSIONID",
      value: "8CF117A89303EC4C7089DB1C8F70CC6D",
    },
  ];

  await page.setCookie(...cookies);

  // Website URL to export as pdf
  const website_url =
    "http://gw.drcc.co.kr/office/app/appPreview.do?docuno=202302011511310502&mode=read&opprint=false&attachprint=false";

  await page.goto(website_url, { waitUntil: "networkidle0" });

  //   await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    path: "result6.pdf",
    printBackground: false,
    format: "A3",
  });

  await browser.close();
})();
