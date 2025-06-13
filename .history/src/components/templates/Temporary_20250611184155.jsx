import React from "react";
import { Col, Row, Typography } from "antd";

function Temporary() {
  const { Title } = Typography;
  return (
    <>
      <Row className=" border-solid  border-blue-200 border-2  h-100% w-full">
        <Col span={24} className="bg-blue-200">
          <Title className="ml-14">Temporary</Title>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default Temporary;
