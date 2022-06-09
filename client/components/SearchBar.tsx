import { NextPage } from "next";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { apiMainURL } from "../constants";
import useDebounce from "../hooks/useDebounce";

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
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      fetch(`${apiMainURL}/articles?title=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => setCurrentArticles(data))
        .catch((err) => console.log(err));
      setDate(null);
      console.log("Was fetched");
    }
  }, [debouncedQuery, setDate, setCurrentArticles]);

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
