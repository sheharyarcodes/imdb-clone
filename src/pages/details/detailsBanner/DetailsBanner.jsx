import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { Helmet } from "react-helmet-async";
import {
  ContentWrapper,
  Genres,
  Image,
  Rating,
  VideoPopup,
} from "../../../components";
import PlayIcon from "../../../icons/PlayIcon";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres.map((g) => g.id);

  const director = crew?.filter((d) => d.job === "Director");
  const writer = crew?.filter(
    (w) => w.job === "Screenplay" || w.job === "Story" || w.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      <Helmet>
        <title>
          {`${data?.name || data?.title || "Title"} (${dayjs(
            data?.release_date
          ).format("YYYY")}) `}
          | IMDb Clone
        </title>
      </Helmet>

      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Image src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Image
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Image className="posterImg" src={PosterFallback} />
                    )}
                  </div>

                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>

                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />

                    <div className="row">
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">
                          Watch
                          <br />
                          Trailer
                        </span>
                      </div>

                      <div className="ratingContainer">
                        <span className="heading">Rating: </span>
                        <Rating childern={data.vote_average.toFixed(1)} />
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview:</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">{data.release_date}</span>
                        </div>
                      )}

                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director.map((d, i) => (
                            <span key={nanoid()}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer.map((w, i) => (
                            <span key={nanoid()}>
                              {w.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((c, i) => (
                            <span key={nanoid()}>
                              {c.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
