import React from "react";
import { Col, Row, Typography } from "antd";

function Temporary() {
  const { Title } = Typography;
  return (
    <>
      <Row
        className=" border-solid  border-blue-200 border-4"
        style={{ height: "45rem" }}
      >
        <Col span={24} className="bg-blue-200">
          <Title className="">Temporary</Title>
        </Col>
        <Col
          className="relative "
          style={{
            height: "50rem",
            width: "10rem",
            position: "absolute",
            marginTop: "10rem",
            marginLeft: "10px",
            backgroundColor: "blue",
          }}
        >
          left
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default Temporary;
