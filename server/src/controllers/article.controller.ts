import { Article } from "@prisma/client";
import { Request, Response } from "express";
import { findArticles } from "src/services/article.service";

export async function articleHandler(req: Request, res: Response) {
  try {
    let articles: Article[] = [];

    //general all articles
    if (Object.keys(req.query).length === 0) {
      articles = await findArticles();
      return res.status(200).json(articles);
    }

    //all query params have to fall into at least one of these
    if (
      !Object.keys(req.query).every(
        (k) => k === "title" || k === "source" || k === "link" || k === "createdAt"
      )
    ) {
      return res.status(404).send("Cannot find resource");
    }

    //handle query params
    const selectedArticles: Record<string, any> = {};

    //case insesitive search in this pattern for prisma
    /*
      where: {
        title: {
          contains: req.query[title],
          mode: "insensitive",
        },
        createdAt: {
          contains: req.query[createdAt],
          mode: "insensitive",
        }
        ...etc.
      }
    */
    for (const key in req.query) {
      if (!selectedArticles[key])
        selectedArticles[key] = {
          contains: req.query[key],
          mode: "insensitive",
        };
    }

    articles = await findArticles({
      where: selectedArticles,
    });

    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).send("Internal Server Error, Please try again later");
  }
}
