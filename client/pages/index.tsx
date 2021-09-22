import dayjs from "dayjs";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

interface Article {
  createdAt: string;
  title: string;
  source: string;
  link: string;
}

interface Props {
  articles: Article[];
}

const sources = ["444.hu", "telex.hu", "index.hu", "hvg.hu", "24.hu", "888.hu"];

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <>
      <h1>Mai Hírek</h1>
      <div className='news-grid'>
        {sources.map((source) => (
          <div key={source}>
            <h2 key={source}>{source}</h2>
            {articles.map((a) =>
              a.source.slice(8) === source ? <p>{a.title}</p> : null
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  //TODO:change later to proper hostname

  const res = await fetch(
    `http://localhost:4000/articles?createdAt=${dayjs().format("YYYY/MM/DD")}`
  );

  const articles: Article[] = await res.json();

  return {
    props: {
      articles,
    },
  };
};

export default Home;
