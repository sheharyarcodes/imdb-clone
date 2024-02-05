import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
        <div className="infoText">
          It as announcing it me stimulated frequently continuing. Least their
          she you now above going stand forth. He pretty future afraid should
          genius spirit on. Set property addition building put likewise get. Of
          will at sell well at as. Too want but tall nay like old. Removing
          yourself be in answered he.
        </div>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Review</li>
          <li className="menuItem">Blog</li>
        </ul>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
