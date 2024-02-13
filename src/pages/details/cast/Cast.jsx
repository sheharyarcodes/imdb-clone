import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import "./style.scss";

import avatar from "../../../assets/avatar.png";
import { ContentWrapper, Image } from "../../../components";
import { nanoid } from "@reduxjs/toolkit";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const castRef = useRef(null);

  const handleNavigation = (direction) => {
    const container = castRef.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast:</div>
        {!loading ? (
          <div ref={castRef} className="listItems">
            <FaAngleDoubleLeft
              onClick={() => handleNavigation("left")}
              className="castArrow castLeftNavIcon"
            />

            {data?.map((item) => {
              const imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div key={nanoid()} className="listItem">
                  <div className="profileImg">
                    <Image src={imgUrl} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}

            <FaAngleDoubleRight
              onClick={() => handleNavigation("right")}
              className="castArrow castRightNavIcon"
            />
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
