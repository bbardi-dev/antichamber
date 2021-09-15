import { scraper } from "./Scraper";

const main = async () => {
  scraper("https://444.hu/", ".item__title > a");
  scraper("https://telex.hu/", ".article_title > a");
  scraper("https://index.hu/", ".cikkcim>a");
  scraper("https://hvg.hu/", ".text-holder>.heading-3>a");
  scraper("https://24.hu/", ".m-articleWidget__link");
  scraper("https://888.hu/", "figcaption>a, div.text>a");
};

main();
