const puppeteer = require("puppeteer");

(async () => {

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
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
