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
            height: "20rem",
            width: "60rem",
            backgroundColor: "#1f3044",
          }}
        >
          <Col span={24} className="" style={{ width: "60rem" }}>
            <Title className="">Temporary</Title>
          </Col>
          <Col
            className="relative "
            style={{
              height: "35rem",
              width: "15rem",
              position: "absolute",
              marginTop: "10rem",
              marginLeft: "10rem",
              backgroundColor: "#d9d9d9",
            }}
          >
            left
          </Col>
          <Col></Col>
        </Row>
      </div>
    </>
  );
}

export default Temporary;
