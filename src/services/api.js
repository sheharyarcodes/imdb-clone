import axios from "axios";

const BASER_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASER_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export default fetchDataFromApi;
