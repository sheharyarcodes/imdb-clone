import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ContentWrapper } from "../";
import logo from "../../assets/imdb-logo.png";

import "./style.scss";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileMenu = () => {
    if (!mobileMenu) {
      setMobileMenu(true);
      setShowSearch(false);
    } else {
      setMobileMenu(false);
    }
  };

  const handleSearchMenu = () => {
    if (!showSearch) {
      setMobileMenu(false);
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const handleNavigation = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  const handleSearchQuery = (event) => {
    if (event.key === "Enter" && query !== "") {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const controlNavBar = () => {
    if (window.scrollY > 200 && !mobileMenu && !showSearch) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }

    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => window.removeEventListener("scroll", controlNavBar);
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="imdb-logo" />
          </Link>
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => handleNavigation("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => handleNavigation("tv")}>
            TV Shows
          </li>
          <li className="menuItem" onClick={handleSearchMenu}>
            <FaSearch />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <FaSearch onClick={handleSearchMenu} />
          {mobileMenu ? (
            <RxCross2 onClick={handleMobileMenu} />
          ) : (
            <GiHamburgerMenu onClick={handleMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchBox">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search any movie or TV show"
                onKeyUp={handleSearchQuery}
              />
              <RxCross2 className="crossIcon" onClick={handleSearchMenu} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
