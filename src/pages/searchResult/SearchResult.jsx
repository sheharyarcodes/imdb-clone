import React, { useEffect, useState } from "react";
import fetchDataFromApi from "../../services/api";
import { nanoid } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet-async";
import { Card, Spinner, ContentWrapper, Image } from "../../components";
import noResults from "../../assets/no-results.png";
import "./style.scss";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      <Helmet>
        <title>Search: "{query}"</title>
      </Helmet>

      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search result${
                  data?.total_results > 1 ? "s" : ""
                } for "${query}"`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item) => {
                  if (item.media_type === "person") return;
                  return <Card key={nanoid()} data={item} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="no-results-found">
              <span className="resultNotFoundText">
                Sorry, Results not found!
              </span>
              <Image className="no-results-img" src={noResults} />
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
