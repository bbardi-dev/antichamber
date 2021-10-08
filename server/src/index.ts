import express from "express";
import config from "./config/config";
import log from "./config/logger";
import routes from "./routes";
//@ts-ignore
import cors from "cors";

const main = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));

  app.listen(config.server.port, () => {
    log.info(`Listening on ${config.server.hostname}/${config.server.port}`);
    routes(app);
  });
};

main();
