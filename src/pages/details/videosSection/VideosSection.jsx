import React, { useState } from "react";

import "./style.scss";

import PlayIcon from "../../../icons/PlayIcon";
import { VideoPopup, Image, ContentWrapper } from "../../../components";
import { nanoid } from "@reduxjs/toolkit";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Featured Videos</div>
        {!loading ? (
          <div className="videos">
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
