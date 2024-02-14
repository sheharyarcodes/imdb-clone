import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { ContentWrapper, SwitchTab, Carousel } from "../../../components";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
        <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
