import React from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import VideosSection from "./videosSection/VideosSection";
import Cast from "./cast/Cast";
import Similar from "./detailsCarousels/Similar";
import Recommendation from "./detailsCarousels/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div className="details">
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast
        mediaType={mediaType}
        data={credits?.cast}
        loading={creditsLoading}
      />
      <VideosSection data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
