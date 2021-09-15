import { Express, Request, Response } from "express";

export default function (app: Express) {
  app.get("/yoo", (req: Request, res: Response) => {
    res.status(200).send("hello there");
  });

  //getAllArticles route

  //handle query params
}
