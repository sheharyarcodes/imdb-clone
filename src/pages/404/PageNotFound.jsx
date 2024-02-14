import React from "react";
import { Helmet } from "react-helmet-async";
import { ContentWrapper } from "../../components";
import "./style.scss";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <Helmet>
        <title>Error 404</title>
      </Helmet>

      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
