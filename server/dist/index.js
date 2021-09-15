"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scraper_1 = require("./Scraper");
const main = async () => {
    (0, Scraper_1.scraper)("https://444.hu/", ".item__title > a");
    (0, Scraper_1.scraper)("https://telex.hu/", ".article_title > a");
    (0, Scraper_1.scraper)("https://index.hu/", ".cikkcim>a");
    (0, Scraper_1.scraper)("https://hvg.hu/", ".text-holder>.heading-3>a");
    (0, Scraper_1.scraper)("https://24.hu/", ".m-articleWidget__link");
    (0, Scraper_1.scraper)("https://888.hu/", "figcaption>a, div.text>a");
};
main();
//# sourceMappingURL=index.js.map