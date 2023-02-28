const puppeteer = require("puppeteer");

let sessionId = "358BBECDF53219F5A5C2571444E294FD";
let docuno = "202302011511310502";

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

  const website_url = `http://gw.drcc.co.kr/office/app/appPreview.do?docuno=${docuno}&mode=read&opprint=false&attachprint=false`;

  // load
  // domcontentloaded
  // networkidle0
  // networkidle2

  const waitUntil = "networkidle0";

  await page.goto(website_url, { waitUntil: waitUntil });

  const pdf = await page.pdf({
    path: "result6.pdf",
    printBackground: false,
    format: "A3",
  });

  await browser.close();
})();
