import React from "react";
import { Helmet } from "react-helmet-async";
import { HeroBanner, Trending, Popular, TopRated } from "./index";
import "./style.scss";

const Home = () => {
  return (
    <div className="home">
      <Helmet>
        <title>Home | IMDb Clone</title>
      </Helmet>

      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
