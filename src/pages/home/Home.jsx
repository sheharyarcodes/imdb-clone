import React from "react";
import "./style.scss";
import { HeroBanner, Trending, Popular, TopRated } from "./index";

const Home = () => {
  return (
    <div className="home">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
