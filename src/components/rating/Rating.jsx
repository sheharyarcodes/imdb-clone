import React from "react";
import { FaStar } from "react-icons/fa";

import "./style.scss";

const Rating = ({ childern }) => {
  return (
    <div className="rating">
      <FaStar />
      <span className="text">{childern}</span>
    </div>
  );
};

export default Rating;
