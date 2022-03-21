import { Article } from "@prisma/client";
import dayjs from "dayjs";
import puppeteer, { Browser, Page } from "puppeteer";
import { ScrapeTarget } from "./scrapeTargets";

export async function launchPuppeteer(): Promise<Browser> {
  return await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

//scrapes all relevant data from the site and returns an array of type Article
export async function getArticlesForCurrentPage(page: Page, scrapeSelector: string): Promise<Article[]> {
  return await page.$$eval(scrapeSelector, (items) => {
    return items
      .map((it) => ({
        source: "",
        //make title a simple continous string
        title: it.textContent?.replace(/(\r\n|\n|\r)/gm, "").trim() ?? "",
        link: it.getAttribute("href") ?? "",
        createdAt: "",
      }))
      .slice(0, 24);
  });
}

export async function scrapeArticlesForPage({ pageToGo, scrapeSelector }: ScrapeTarget) {
  try {
    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    await page.goto(pageToGo);

    const final: Article[] = await getArticlesForCurrentPage(page, scrapeSelector);

    //pad out Article object with info that is not coming from the scrape itself
    final.forEach((f) => ((f.source = pageToGo), (f.createdAt = dayjs().format("YYYY/MM/DD"))));

    await browser.close();

    return final;
  } catch (error) {
    console.error("ERROR WITH BROWSER", error);
    return null;
  }
}
