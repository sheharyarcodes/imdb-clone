import React from "react";
import { Carousel } from "../../../components";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  if (data?.results.length > 0)
    return (
      <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
      />
    );
};

export default Similar;
