import { useState, useEffect } from "react";
import fetchDataFromApi from "../services/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setLoading("Loading...");
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
        console.log(err.message);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
