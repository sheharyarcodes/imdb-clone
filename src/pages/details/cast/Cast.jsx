import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { ContentWrapper, Image } from "../../../components";
import avatar from "../../../assets/avatar.png";
import "./style.scss";

const Cast = ({ mediaType, data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const castRef = useRef(null);
  const castType = mediaType === "tv" ? "TV Show's Cast" : "Movie's Cast";

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
        {data?.length > 0 && <div className="sectionHeading">{castType}</div>}

        {data?.length > 6 && (
          <>
            <FaAngleDoubleLeft
              onClick={() => handleNavigation("left")}
              className="castArrow castLeftNavIcon"
            />
            <FaAngleDoubleRight
              onClick={() => handleNavigation("right")}
              className="castArrow castRightNavIcon"
            />
          </>
        )}

        {!loading ? (
          <div ref={castRef} className="listItems">
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
