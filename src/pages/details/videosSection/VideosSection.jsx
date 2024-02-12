import React, { useRef, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import "./style.scss";

import PlayIcon from "../../../icons/PlayIcon";
import { VideoPopup, Image, ContentWrapper } from "../../../components";
import { nanoid } from "@reduxjs/toolkit";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const videosRef = useRef(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const handleNavigation = (direction) => {
    const container = videosRef.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Featured Videos</div>

        <FaAngleDoubleLeft
          onClick={() => handleNavigation("left")}
          className="videosArrow videosLeftNavIcon"
        />

        <FaAngleDoubleRight
          onClick={() => handleNavigation("right")}
          className="videosArrow videosRightNavIcon"
        />

        {!loading ? (
          <div ref={videosRef} className="videos">
            {data?.map((item) => (
              <div
                key={nanoid()}
                className="videoItem"
                onClick={() => {
                  setShow(true);
                  setVideoId(item.key);
                }}
              >
                <div className="videoThumbnail">
                  <Image
                    src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
