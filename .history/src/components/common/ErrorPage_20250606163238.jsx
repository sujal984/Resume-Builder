import React from "react";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b8fbc5cf7f88059c0987c875803e2434342264bc
import { Button, Result } from "antd";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
<<<<<<< HEAD
=======
=======
import { Result } from "antd";
import { Helmet } from "react-helmet";

function ErrorPage() {
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c
>>>>>>> b8fbc5cf7f88059c0987c875803e2434342264bc
  return (
    <>
      <Helmet>
        <title> Error 404</title>
      </Helmet>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b8fbc5cf7f88059c0987c875803e2434342264bc
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
<<<<<<< HEAD
=======
=======
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c
>>>>>>> b8fbc5cf7f88059c0987c875803e2434342264bc
    </>
  );
}

export default ErrorPage;
