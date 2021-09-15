import { scraper } from "./Scraper";
import express from "express";
import config from "./config/config";
import log from "./config/logger";
import routes from "./routes";

const main = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.listen(config.server.port, config.server.hostname, () => {
    log.info(`Listening on ${config.server.hostname}/${config.server.port}`);
    routes(app);
  });
  //   scraper("https://444.hu/", ".item__title > a");
  //   scraper("https://telex.hu/", ".article_title > a");
  //   scraper("https://index.hu/", ".cikkcim>a");
  //   scraper("https://hvg.hu/", ".text-holder>.heading-3>a");
  //   scraper("https://24.hu/", ".m-articleWidget__link");
  //   scraper("https://888.hu/", "figcaption>a, div.text>a");
};

main();
