"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./prisma/client"));
const scraper_1 = require("./scraper");
function default_1(app) {
    app.get("/", (_, res) => res.send("Hello World"));
    app.get("/super-secret-scrape", async (_, res) => {
        try {
            await (0, scraper_1.scraper)("https://444.hu", ".item__title > a");
            await (0, scraper_1.scraper)("https://telex.hu", ".article_title > a");
            await (0, scraper_1.scraper)("https://index.hu", ".cikkcim>a");
            await (0, scraper_1.scraper)("https://hvg.hu", ".text-holder>.heading-3>a");
            await (0, scraper_1.scraper)("https://24.hu", ".m-articleWidget__link");
            await (0, scraper_1.scraper)("https://888.hu", "figcaption>a, div.text>a");
            return res.status(200).send("Scrape successful");
        }
        catch (error) {
            return res
                .status(500)
                .send("Internal Server Error, Please try again later");
        }
    });
    app.get("/articles", async (req, res) => {
        try {
            let articles = [];
            if (Object.keys(req.query).length === 0) {
                articles = await client_1.default.article.findMany();
                return res.status(200).json(articles);
            }
            if (!Object.keys(req.query).every((k) => k === "title" || k === "source" || k === "link" || k === "createdAt")) {
                return res.status(404).send("Cannot find resource");
            }
            const selectedArticles = {};
            for (const key in req.query) {
                if (!(key in selectedArticles))
                    selectedArticles[key] = {
                        contains: req.query[key],
                        mode: "insensitive",
                    };
            }
            articles = await client_1.default.article.findMany({
                where: selectedArticles,
            });
            return res.status(200).json(articles);
        }
        catch (error) {
            return res
                .status(500)
                .send("Internal Server Error, Please try again later");
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map