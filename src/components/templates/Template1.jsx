import React from "react";
import Helmet from "react-helmet";

function Template1({ title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </>
  );
}

export default Template1;
