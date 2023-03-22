const puppeteer = require("puppeteer-extra");
const { executablePath } = require("puppeteer");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
setInterval(() => {
  (async () => {
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();

    await page.goto("https://jobs.blognone.com/user/", {
      timeout: 0,
    });
    await page.focus("#email");
    await page.keyboard.type("roshan31992@gmail.com");
    await page.focus("#password");
    await page.keyboard.type("Rosh@n03111992");
    await page.keyboard.down("Enter");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    const linkHandlers = await page.waitForXPath(
      "//a[contains(text(), 'Edit')]"
    );
    await linkHandlers.click().then(async () => {
      await page.reload();
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });
      await page.waitForTimeout(3000);
      await page.focus("#jobTitle");
      await page.keyboard.type("1");
      await page.keyboard.down("Enter");
    });
    await page.goBack();
    browser.close();
  })();
}, 5000);
