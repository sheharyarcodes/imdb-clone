import React from "react";
import { FaStar } from "react-icons/fa";
import "./style.scss";

const Rating = ({ children }) => {
  return (
    <div className="rating">
      <FaStar />
      <span className="text">{children}</span>
    </div>
  );
};

export default Rating;
