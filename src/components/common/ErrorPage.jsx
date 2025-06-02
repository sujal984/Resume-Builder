import React from "react";
import { Result } from "antd";
import { Helmet } from "react-helmet";

function ErrorPage() {
  return (
    <>
      <Helmet>
        <title> Error 404</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </>
  );
}

export default ErrorPage;
