"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./scraper");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./config/logger"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const main = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.listen(config_1.default.server.port, () => {
        logger_1.default.info(`Listening on ${config_1.default.server.hostname}/${config_1.default.server.port}`);
        (0, routes_1.default)(app);
    });
    node_cron_1.default.schedule("0 8 * * *", async () => {
        await (0, scraper_1.scraper)("https://444.hu", ".item__title > a");
        await (0, scraper_1.scraper)("https://telex.hu", ".article_title > a");
        await (0, scraper_1.scraper)("https://index.hu", ".cikkcim>a");
        await (0, scraper_1.scraper)("https://hvg.hu", ".text-holder>.heading-3>a");
        await (0, scraper_1.scraper)("https://24.hu", ".m-articleWidget__link");
        await (0, scraper_1.scraper)("https://888.hu", "figcaption>a, div.text>a");
    }, {
        timezone: "Europe/Budapest",
    });
};
main();
//# sourceMappingURL=index.js.map