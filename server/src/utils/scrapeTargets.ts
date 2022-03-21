export interface ScrapeTarget {
  pageToGo: string;
  scrapeSelector: string;
}

export const targets: ScrapeTarget[] = [
  {
    pageToGo: "https://444.hu",
    scrapeSelector: ".item__title > a",
  },
  {
    pageToGo: "https://telex.hu",
    scrapeSelector: ".leader > .item__content > .item__details > .item__title",
  },
  {
    pageToGo: "https://index.hu",
    scrapeSelector: ".cikkcim>a",
  },
  {
    pageToGo: "https://hvg.hu",
    scrapeSelector: ".text-holder>.heading-3>a",
  },
  {
    pageToGo: "https://24.hu",
    scrapeSelector: ".m-articleWidget__link",
  },
  {
    pageToGo: "https://888.hu",
    scrapeSelector: "figcaption>a, div.text>a",
  },
];
