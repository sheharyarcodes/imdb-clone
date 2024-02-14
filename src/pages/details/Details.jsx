import React from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {
  Cast,
  DetailsBanner,
  Recommendation,
  Similar,
  VideosSection,
} from "./";
import "./style.scss";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div className="details">
      {/* Helmet is declared in the DetailsBanner due to the access of the movie/tv_show's name/title. */}

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
