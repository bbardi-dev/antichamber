"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraper = void 0;
const client_1 = __importDefault(require("./prisma/client"));
const dayjs_1 = __importDefault(require("dayjs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
async function scraper(pageToGo, scrapeSelector) {
    let browser;
    try {
        browser = await puppeteer_1.default.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.goto(pageToGo);
        const final = await page.$$eval(scrapeSelector, (items) => {
            return items
                .map((it) => {
                var _a, _b, _c;
                return ({
                    source: "",
                    title: (_b = (_a = it.textContent) === null || _a === void 0 ? void 0 : _a.replace(/(\r\n|\n|\r)/gm, "").trim()) !== null && _b !== void 0 ? _b : "",
                    link: (_c = it.getAttribute("href")) !== null && _c !== void 0 ? _c : "",
                    createdAt: "",
                });
            })
                .slice(0, 24);
        });
        final.forEach((f) => ((f.source = pageToGo), (f.createdAt = (0, dayjs_1.default)().format("YYYY/MM/DD"))));
        await client_1.default.article.createMany({
            data: final,
            skipDuplicates: true,
        });
        console.log(pageToGo, final, final.length);
        await browser.close();
    }
    catch (error) {
        console.error("ERROR WITH BROWSER", error);
    }
}
exports.scraper = scraper;
//# sourceMappingURL=scraper.js.map