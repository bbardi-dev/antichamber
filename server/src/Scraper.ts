import dayjs from "dayjs";
import puppeteer, { Browser } from "puppeteer";

export async function scraper(pageToGo: string, scrapeSelector: string) {
  let browser: Browser;
  try {
    console.log("Opening browser...");
    browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(pageToGo);

    const final = await page.$$eval(scrapeSelector, (items) => {
      return items.map((it) => ({
        source: "",
        title: it.textContent?.replace(/(\r\n|\n|\r)/gm, "").trim(),
        link: it.getAttribute("href"),
        createdAt: dayjs().format("YYYY/MM/DD"),
      }));
    });

    final.forEach((f) => (f.source = pageToGo));

    console.log(pageToGo, final, final.length);

    await browser.close();
  } catch (error) {
    console.error("ERROR WITH BROWSER", error);
  }
}
