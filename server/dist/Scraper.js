"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraper = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
async function scraper(pageToGo, scrapeSelector) {
    let browser;
    try {
        console.log("Opening browser...");
        browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.goto(pageToGo);
        const final = await page.$$eval(scrapeSelector, (items) => {
            return items.map((it) => {
                var _a;
                return ({
                    source: "",
                    title: (_a = it.textContent) === null || _a === void 0 ? void 0 : _a.replace(/(\r\n|\n|\r)/gm, "").trim(),
                    link: it.getAttribute("href"),
                    createdAt: (0, dayjs_1.default)().format("YYYY/MM/DD"),
                });
            });
        });
        final.forEach((f) => (f.source = pageToGo));
        console.log(pageToGo, final, final.length);
        await browser.close();
    }
    catch (error) {
        console.error("ERROR WITH BROWSER", error);
    }
}
exports.scraper = scraper;
//# sourceMappingURL=Scraper.js.map