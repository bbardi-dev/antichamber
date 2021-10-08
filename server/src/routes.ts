import prisma from "./prisma/client";
import { Express, Request, Response } from "express";
import { Article } from ".prisma/client";
import { scraper } from "./scraper";

export default function (app: Express) {
  app.get("/", (_, res) => res.send("Hello World"));

  app.get("/super-secret-scrape", async (_, res) => {
    try {
      await scraper("https://444.hu", ".item__title > a");
      await scraper("https://telex.hu", ".article_title > a");
      await scraper("https://index.hu", ".cikkcim>a");
      await scraper("https://hvg.hu", ".text-holder>.heading-3>a");
      await scraper("https://24.hu", ".m-articleWidget__link");
      await scraper("https://888.hu", "figcaption>a, div.text>a");

      return res.status(200).send("Scrape successful");
    } catch (error) {
      return res
        .status(500)
        .send("Internal Server Error, Please try again later");
    }
  });

  app.get("/articles", async (req: Request, res: Response) => {
    try {
      let articles: Article[] = [];

      //general all articles
      if (Object.keys(req.query).length === 0) {
        articles = await prisma.article.findMany();
        return res.status(200).json(articles);
      }

      if (
        !Object.keys(req.query).every(
          (k) =>
            k === "title" || k === "source" || k === "link" || k === "createdAt"
        )
      ) {
        return res.status(404).send("Cannot find resource");
      }

      //handle query params
      const selectedArticles: Record<string, any> = {};

      for (const key in req.query) {
        if (!(key in selectedArticles))
          selectedArticles[key] = {
            contains: req.query[key],
            mode: "insensitive",
          };
      }

      articles = await prisma.article.findMany({
        where: selectedArticles,
      });

      return res.status(200).json(articles);
    } catch (error) {
      return res
        .status(500)
        .send("Internal Server Error, Please try again later");
    }
  });
}
