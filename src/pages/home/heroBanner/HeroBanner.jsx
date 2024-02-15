import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ContentWrapper, Image } from "../../../components";
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = String(
      url?.backdrop +
        data?.results[Math.floor(Math.random() * 20)].backdrop_path
    );
    console.log(bg);

    setBackground(bg);
  }, [data, loading]);

  const handleSearchQuery = (event) => {
    if (event.key === "Enter" && query !== "") {
      navigate(`/search/${query.toLowerCase()}`);
    }
  };

  const headerText = () => {
    const time = new Date().getHours();
    if (time >= 0 && time < 12) {
      return "morning";
    } else if (time >= 12 && time < 17) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Image src={background} alt="background-img" />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <h1 className="title">
            Good <span>{headerText()}</span>!
          </h1>
          <p className="subtitle">Explore millions of movies and TV shows.</p>
          <div className="searchBox">
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search any movie or TV show"
              onKeyUp={handleSearchQuery}
            />
            <button
              onClick={() => {
                query !== "" && navigate(`/search/${query.toLowerCase()}`);
              }}
            >
              <FaSearch color="white" size="25px" />
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
