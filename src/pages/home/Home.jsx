import React from "react";
import "./style.scss";
import { HeroBanner, Trending } from "./index";

const Home = () => {
  return (
    <div className="home">
      <HeroBanner />
      <Trending />
    </div>
  );
};

export default Home;
