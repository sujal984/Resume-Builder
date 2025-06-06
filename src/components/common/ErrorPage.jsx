import React from "react";
import { Button, Result } from "antd";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <Helmet>
        <title> Error 404</title>
      </Helmet>
      <div className="error-page">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
        <Button type="primary" onClick={handleBack} size="large">
          {" "}
          Back Home
        </Button>
      </div>
    </>
  );
}

export default ErrorPage;
