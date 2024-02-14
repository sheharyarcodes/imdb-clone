import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rating, Image, Genres } from "../";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

const Card = ({ data, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  return (
    <div
      className="card"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Image className="posterImg" src={posterUrl} />
        <Rating childern={data.vote_average.toFixed(1)} />
        <Genres data={data.genre_ids.slice(0, 2)} />
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default Card;
