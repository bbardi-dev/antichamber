import prisma from "../prisma/client";
import { Express, Request, Response } from "express";
import { Article } from ".prisma/client";
import { scrapeArticlesHandler } from "../controllers/scrape.controller";
import { targets } from "src/utils/scrapeTargets";

export default function (app: Express) {
  app.get("/healthcheck", (_, res) => res.send("I am okay"));

  app.get("/super-secret-scrape", scrapeArticlesHandler(targets));

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
          (k) => k === "title" || k === "source" || k === "link" || k === "createdAt"
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
      return res.status(500).send("Internal Server Error, Please try again later");
    }
  });
}
