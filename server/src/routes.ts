import prisma from "./prisma/client";
import { Express, Request, Response } from "express";
import { Article } from ".prisma/client";

export default function (app: Express) {
  app.get("/", (_, res) => res.send("Hello World"));

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
