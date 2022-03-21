import express from "express";
import config from "./config/config";
import log from "./config/logger";
import router from "./router/router";
//@ts-ignore
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(config.server.port, () => {
  log.info(`Listening on ${config.server.hostname}/${config.server.port}`);
});
