const puppeteer = require("puppeteer");

let sessionId = "358BBECDF53219F5A5C2571444E294FD";
let docunoArray = [
  "202301111344220014",
  "202301041056000883",
  "202212281159270764",
  "202212131438260989",
  "202205250924110373",
];

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
    const website_url = `http://gw.drcc.co.kr/office/app/appPreview.do?docuno=${docuno}&mode=read&opprint=false&attachprint=false`;

    await page.goto(website_url, { waitUntil: "networkidle0" });

    await page.pdf({
      path: `${docuno}.pdf`,
      printBackground: false,
      format: "A3",
    });
  }

  await browser.close();
})();
