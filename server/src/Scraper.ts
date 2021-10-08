import prisma from "./prisma/client";
import dayjs from "dayjs";
import puppeteer, { Browser } from "puppeteer";

export async function scraper(pageToGo: string, scrapeSelector: string) {
  let browser: Browser;
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(pageToGo);

    const final = await page.$$eval(scrapeSelector, (items) => {
      return items
        .map((it) => ({
          source: "",
          title: it.textContent?.replace(/(\r\n|\n|\r)/gm, "").trim() ?? "",
          link: it.getAttribute("href") ?? "",
          createdAt: "",
        }))
        .slice(0, 24);
    });

    final.forEach(
      (f) => (
        (f.source = pageToGo), (f.createdAt = dayjs().format("YYYY/MM/DD"))
      )
    );

    await prisma.article.createMany({
      data: final,
      skipDuplicates: true,
    });

    console.log(pageToGo, final, final.length);

    await browser.close();
  } catch (error) {
    console.error("ERROR WITH BROWSER", error);
  }
}
