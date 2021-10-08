import { scraper } from "./scraper";
import express from "express";
import config from "./config/config";
import log from "./config/logger";
import routes from "./routes";
//@ts-ignore
import cors from "cors";
import cron from "node-cron";

const main = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));

  app.listen(config.server.port, () => {
    log.info(`Listening on ${config.server.hostname}/${config.server.port}`);
    routes(app);
  });

  cron.schedule(
    "0 8 * * *",
    async () => {
      await scraper("https://444.hu", ".item__title > a");
      await scraper("https://telex.hu", ".article_title > a");
      await scraper("https://index.hu", ".cikkcim>a");
      await scraper("https://hvg.hu", ".text-holder>.heading-3>a");
      await scraper("https://24.hu", ".m-articleWidget__link");
      await scraper("https://888.hu", "figcaption>a, div.text>a");
    },
    {
      timezone: "Europe/Budapest",
    }
  );
};

main();
