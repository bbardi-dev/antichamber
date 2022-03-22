import { NextPage } from "next";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { apiMainURL } from "../constants";

interface Article {
  createdAt: string;
  title: string;
  source: string;
  link: string;
}

interface Props {
  setCurrentArticles: Dispatch<SetStateAction<Article[]>>;
  setDate: Dispatch<SetStateAction<Date | null>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const SearchBar: NextPage<Props> = ({ setCurrentArticles, setDate, searchQuery, setSearchQuery }) => {
  useEffect(() => {
    if (searchQuery.length > 2) {
      fetch(`${apiMainURL}/articles?title=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => setCurrentArticles(data))
        .catch((err) => console.log(err));
      setDate(null);
    }
  }, [searchQuery, setDate, setCurrentArticles]);

  return (
    <div className='search'>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type='text'
        id='article-search'
        placeholder='Keress a cikkek között'
        name='title'
      />
    </div>
  );
};

export default SearchBar;
