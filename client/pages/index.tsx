import type { NextPage } from "next";
import dayjs from "dayjs";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { useEffect, useState } from "react";
import { apiMainURL, scrapedSources } from "../constants";
import SearchBar from "../components/SearchBar";

interface Article {
  createdAt: string;
  title: string;
  source: string;
  link: string;
}

const Home: NextPage = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (date !== null) {
      if (currentArticles.length === 0) {
        setLoading(true);
      }
      fetch(`${apiMainURL}/articles?createdAt=${dayjs(date).format("YYYY/MM/DD")}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentArticles(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("THE ERROR IS :", err instanceof TypeError, err);
          if (err instanceof TypeError) {
            setLoading(true);
            setTimeout(() => {
              setDate(new Date());
            }, 1000 * 10);
          }
        });
    }
  }, [date]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setDate(new Date());
    }
  }, [searchQuery]);

  if (loading)
    return (
      <div className='loader-container'>
        <h2 style={{ marginTop: "5rem" }}>Betöltés...</h2>
        <span className='loader'></span>
        <h4>(Ingyenes szerver miatt sokáig tarthat...)</h4>
      </div>
    );

  return (
    <>
      <h1>Hírek</h1>
      <div className='article-filters'>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentArticles={setCurrentArticles}
          setDate={setDate}
        />
        <DatePicker
          onChange={(e: Date) => {
            setDate(e);
            setSearchQuery("");
          }}
          value={date}
        />
      </div>

      {currentArticles.length > 0 ? (
        <div className='news-grid'>
          {scrapedSources.map((source) => (
            <div className='source-col' key={source}>
              <h2 className={`source-head ${source.replace(/^.*?:\/\//, "")}`}>
                <a href={source}>{source.replace(/^.*?:\/\//, "")}</a>
              </h2>
              {currentArticles.map((a) =>
                a.source === source ? (
                  <article className={source.replace(/^.*?:\/\//, "")} key={a.link}>
                    <a href={a.link.includes("https://") ? a.link : `${a.source}${a.link}`}>
                      <p>{a.title}</p>
                    </a>
                    <span>{a.createdAt}</span>
                  </article>
                ) : null
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ marginTop: "5rem" }}>Nem találhatóak cikkek az adott paraméterekkel</h2>
      )}
    </>
  );
};

export default Home;
