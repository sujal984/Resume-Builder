import React from "react";
import { Col, Row, Typography } from "antd";

function Temporary() {
  const { Title } = Typography;
  return (
    <>
      <div style={{ width: "60rem" }}>
        <Row
          className=" border-solid  border-blue-200 border-4"
          style={{
            height: "100%",
            width: "60rem",
          }}
        >
          <Col span={24} className="" style={{ width: "60rem" }}>
            <Title className="">Temporary</Title>
          </Col>
          <Col
            className="relative "
            style={{
              height: "100%",
              width: "15rem",
              position: "absolute",
              marginTop: "10rem",
              marginLeft: "10rem",
              backgroundColor: "#d9d9d9",
            }}
          >
            left
          </Col>
          <Col
            span={14}
            style={{
              height: "20rem",

              marginLeft: "25rem",
              marginTop: "15rem",
              backgroundColor: "#ffffff",
              border: "1px solid #d9d9d9",
            }}
          ></Col>
          <Col
            span={14}
            style={{
              backgroundColor: "#1f3044",
              height: "15rem",
              marginLeft: "25rem",
            }}
          ></Col>
        </Row>
      </div>
    </>
  );
}

export default Temporary;
