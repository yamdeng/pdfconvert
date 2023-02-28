const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const migPath = require("../../mig-path");
const prefixPdfPath = migPath.PREFIX_PATH_PDF_BODY;
const oldPath = migPath.PREFIX_PATH_OLD_ATTACH;
const newPath = migPath.PREFIX_PATH_NEW_ATTACH;

let sessionId = "358BBECDF53219F5A5C2571444E294FD";
let docunoArray = [
  "202301111344220014",
  "202301041056000883",
  "202212281159270764",
  "202212131438260989",
  "202205250924110373",
];

let attachArray = ["1.docx", "2.xlsx", "3.md", "4.pptx", "5.sql"];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  const cookies = [
    {
      url: "http://gw.drcc.co.kr",
      name: "JSESSIONID",
      value: sessionId,
    },
  ];

  await page.setCookie(...cookies);

  for (
    let docunoArrayIndex = 0;
    docunoArrayIndex < docunoArray.length;
    docunoArrayIndex++
  ) {
    const docuno = docunoArray[docunoArrayIndex];
    const attachFileName = attachArray[docunoArrayIndex];
    const website_url = `http://gw.drcc.co.kr/office/app/appPreview.do?docuno=${docuno}&mode=read&opprint=false&attachprint=false`;

    await page.goto(website_url, { waitUntil: "networkidle0" });
    const docunoYear = docuno.substring(0, 4);
    const pdfCreateFullPath = `${prefixPdfPath}${path.sep}${docunoYear}${path.sep}${docuno}.pdf`;
    await page.pdf({
      path: pdfCreateFullPath,
      printBackground: false,
      format: "A3",
    });
    try {
      fs.copyFileSync(
        `${oldPath}/${attachFileName}`,
        `${newPath}/${attachFileName}`
      );
    } catch (e) {
      console.error("error: ", e);
    }
  }

  await browser.close();
})();
