import React from "react";
import { Col, Row, Typography } from "antd";

function Temporary() {
  const { Title } = Typography;
  return (
    <>
      <div
        style={{ width: "60rem", justifyContent: "center", margin: "0 auto" }}
      >
        <Row
          className=" border-solid  border-blue-200 border-4"
          style={{
            height: "100%",
            width: "50vw",
          }}
        >
          <Col
            span={24}
            className=""
            style={{
              width: "60rem",
              backgroundColor: "#1f3044",
              height: "100%",
            }}
          >
            <Title className="" style={{ textAlign: "right" }}>
              Sujal <br />
              Jain
            </Title>
          </Col>
          <Col
            className="relative "
            style={{
              height: "40rem",
              width: "15rem",
              position: "absolute",
              marginTop: "5rem",
              marginLeft: "5rem",
              backgroundColor: "#d9d9d9",
            }}
          >
            left
          </Col>
          <Col
            span={14}
            style={{
              height: "20rem",

              marginLeft: "20rem",

              backgroundColor: "#ffffff",
              border: "1px solid #d9d9d9",
            }}
          ></Col>
          <Col
            span={14}
            style={{
              backgroundColor: "#1f3044",
              height: "15rem",
              marginLeft: "20rem",
            }}
          ></Col>
        </Row>
      </div>
    </>
  );
}

export default Temporary;
