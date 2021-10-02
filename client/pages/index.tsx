import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dayjs from "dayjs";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { useEffect, useState } from "react";
import { sources } from "../constants";
import { SearchBar } from "../components/SearchBar";

interface Article {
  createdAt: string;
  title: string;
  source: string;
  link: string;
}

interface Props {
  articles: Article[];
}

const Home: NextPage<Props> = ({ articles }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [currentArticles, setCurrentArticles] = useState(articles);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (date !== null) {
      fetch(
        `https://antichamber-news.herokuapp.com/articles?createdAt=${dayjs(
          date
        ).format("YYYY/MM/DD")}`
      )
        .then((res) => res.json())
        .then((data) => setCurrentArticles(data))
        .catch((err) => console.log(err));
    }
  }, [date]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setDate(new Date());
    }
  }, [searchQuery]);

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
          {sources.map((source) => (
            <div className='source-col' key={source}>
              <h2 className={`source-head ${source.replace(/^.*?:\/\//, "")}`}>
                <a href={source}>{source.replace(/^.*?:\/\//, "")}</a>
              </h2>
              {currentArticles.map((a) =>
                a.source === source ? (
                  <article
                    className={source.replace(/^.*?:\/\//, "")}
                    key={a.link}
                  >
                    <a
                      href={
                        a.link.includes("https://")
                          ? a.link
                          : `${a.source}${a.link}`
                      }
                    >
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
        <h2 style={{ marginTop: "5rem" }}>
          Nem találhatóak cikkek az adott paraméterekkel
        </h2>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  //TODO:change later to proper hostname

  const res = await fetch(
    `https://antichamber-news.herokuapp.com/articles?createdAt=${dayjs().format(
      "YYYY/MM/DD"
    )}`
  );

  const articles: Article[] = await res.json();

  return {
    props: {
      articles,
    },
  };
};

export default Home;
