import React from "react";
import { Row, Col, Typography } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function Temporary() {
  return (
    <Row
      justify="center"
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <Col
        xs={24}
        lg={18}
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        {/* Sidebar */}
        <Col
          xs={0}
          md={6}
          style={{
            background: "#e5e7eb",
            padding: "2rem 1rem",
            position: "absolute",
            height: "100%",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Profile Image */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "#fff",
              border: "6px solid #2c3a4d",
              marginBottom: 24,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src="..." alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
          </div>

          <div style={{ width: "100%", marginBottom: 24 }}>
            <Title level={4} style={{ color: "#2c3a4d" }}>
              Profile
            </Title>
            <Text style={{ fontSize: 13, color: "#444" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Present
              sed sem massa. Morbi dapibus pretium tristique.
            </Text>

            <Title level={4} style={{ color: "#2c3a4d", marginTop: 24 }}>
              Education
            </Title>
            <Text style={{ fontSize: 13, color: "#444" }}>
              Rímberio University
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              2016-2018
            </Text>

            <Title level={4} style={{ color: "#2c3a4d", marginTop: 24 }}>
              Skills
            </Title>
            <div style={{ marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ flex: 1 }}>Design</Text>
                <div
                  style={{
                    width: 60,
                    height: 6,
                    background: "#2c3a4d",
                    borderRadius: 3,
                    marginLeft: 8,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ flex: 1 }}>Photography</Text>
                <div
                  style={{
                    width: 40,
                    height: 6,
                    background: "#2c3a4d",
                    borderRadius: 3,
                    marginLeft: 8,
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ flex: 1 }}>Copywriting</Text>
                <div
                  style={{
                    width: 30,
                    height: 6,
                    background: "#2c3a4d",
                    borderRadius: 3,
                    marginLeft: 8,
                  }}
                />
              </div>
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col
          xs={24}
          md={18}
          style={{
            marginLeft: { md: "25%" },
            background: "#2c3a4d",
            position: "relative",
          }}
        >
          {/* Header */}
          <div style={{ padding: "2.5rem 2.5rem 1.5rem" }}>
            <Title
              level={1}
              style={{
                color: "#fff",
                marginBottom: 0,
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: "2.5rem",
                lineHeight: 1.2,
              }}
            >
              OLIVIA
              <br />
              WILSON
            </Title>
            <Text style={{ color: "#cfd8e3", fontSize: "1.125rem" }}>
              Graphic Designer
            </Text>
          </div>

          {/* Experience */}
          <div
            style={{
              background: "#fff",
              padding: "2rem 2.5rem",
            }}
          >
            <Title
              level={3}
              style={{
                color: "#2c3a4d",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Experience
            </Title>

            <div style={{ marginBottom: "1.125rem" }}>
              <Text strong>2018-2020 | Borcelle Studio</Text>
              <Text style={{ display: "block", marginTop: 4 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Present
                sed sem massa. Morbi dapibus pretium tristique.
              </Text>
            </div>

            <div>
              <Text strong>2022-2024 | Rímberio Studio</Text>
              <Text style={{ display: "block", marginTop: 4 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                velit velit, pharetra non vulputate a, dictum in orci.
              </Text>
            </div>
          </div>

          {/* Contact */}
          <div
            style={{
              background: "#2c3a4d",
              color: "#fff",
              padding: "1.5rem 2.5rem",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#fff",
                marginBottom: "0.75rem",
                fontWeight: 700,
              }}
            >
              Contact
            </Title>

            <Row align="middle" gutter={8} style={{ marginBottom: 6 }}>
              <Col flex="none">
                <PhoneOutlined />
              </Col>
              <Col>
                <Text>123-456-7890</Text>
              </Col>
            </Row>

            <Row align="middle" gutter={8} style={{ marginBottom: 6 }}>
              <Col flex="none">
                <MailOutlined />
              </Col>
              <Col>
                <Text>hello@email.com</Text>
              </Col>
            </Row>

            <Row align="middle" gutter={8}>
              <Col flex="none">
                <EnvironmentOutlined />
              </Col>
              <Col>
                <Text>123 Anywhere St., Any City, ST 12345</Text>
              </Col>
            </Row>
          </div>
        </Col>
      </Col>
    </Row>
  );
}

export default Temporary;
