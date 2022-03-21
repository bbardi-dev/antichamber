import { ScrapeTarget } from "src/utils/scrapeTargets";
import { Request, Response } from "express";
import { scrapeArticlesForPage } from "src/utils/puppeteerUtils";
import { saveScrapedArticles } from "src/services/scrape.service";

export const scrapeArticlesHandler = (targets: ScrapeTarget[]) => async (_: Request, res: Response) => {
  try {
    for (const t of targets) {
      let articles = await scrapeArticlesForPage(t);
      if (articles) saveScrapedArticles(articles);
      else console.error("Could not save articles for this page");
    }

    return res.status(200).send("Scrape successful");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error, Please try again later");
  }
};
