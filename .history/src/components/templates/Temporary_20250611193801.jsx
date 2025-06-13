// import React from "react";
// import { Col, Row, Typography } from "antd";

// function Temporary() {
//   const { Title } = Typography;
//   return (
//     <>
//       <div
//         style={{ width: "60rem", justifyContent: "center", margin: "0 auto" }}
//       >
//         <Row
//           className=" border-solid  border-blue-200 border-4"
//           style={{
//             height: "100%",
//             width: "50vw",
//           }}
//         >
//           <Col
//             span={24}
//             className=""
//             style={{
//               width: "60rem",
//               backgroundColor: "#1f3044",
//               height: "100%",
//             }}
//           >
//             <Title className="" style={{ textAlign: "right" }}>
//               Sujal <br />
//               Jain
//             </Title>
//           </Col>
//           <Col
//             className="relative "
//             style={{
//               height: "40rem",
//               width: "15rem",
//               position: "absolute",
//               marginTop: "5rem",
//               marginLeft: "5rem",
//               backgroundColor: "#d9d9d9",
//             }}
//           >
//             left
//           </Col>
//           <Col
//             span={14}
//             style={{
//               height: "20rem",

//               marginLeft: "20rem",

//               backgroundColor: "#ffffff",
//               border: "1px solid #d9d9d9",
//             }}
//           ></Col>
//           <Col
//             span={14}
//             style={{
//               backgroundColor: "#1f3044",
//               height: "15rem",
//               marginLeft: "20rem",
//             }}
//           ></Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default Temporary;

import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function Temporary() {
  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          width: 800,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          display: "flex",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 220,
            background: "#e5e7eb",
            padding: "0 0 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
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
              marginTop: 36,
              marginBottom: 24,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src="..." alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
          </div>
          <div style={{ width: "80%", marginBottom: 24 }}>
            <Text strong style={{ fontSize: 18, color: "#2c3a4d" }}>
              Profile
            </Text>
            <div style={{ fontSize: 13, color: "#444", margin: "8px 0 20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Present
              sed sem massa. Morbi dapibus pretium tristique.
            </div>
            <Text strong style={{ fontSize: 18, color: "#2c3a4d" }}>
              Education
            </Text>
            <div style={{ fontSize: 13, color: "#444", margin: "8px 0 20px" }}>
              Rímberio University
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              2016-2018
            </div>
            <Text strong style={{ fontSize: 18, color: "#2c3a4d" }}>
              Skills
            </Text>
            <div style={{ marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span style={{ flex: 1 }}>Design</span>
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
                <span style={{ flex: 1 }}>Photography</span>
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
                <span style={{ flex: 1 }}>Copywriting</span>
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
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, background: "#2c3a4d", position: "relative" }}>
          {/* Header */}
          <div
            style={{ padding: "40px 40px 24px 120px", background: "#2c3a4d" }}
          >
            <Title
              level={1}
              style={{
                color: "#fff",
                marginBottom: 0,
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: 38,
              }}
            >
              OLIVIA
              <br />
              WILSON
            </Title>
            <Text style={{ color: "#cfd8e3", fontSize: 18 }}>
              Graphic Designer
            </Text>
          </div>
          {/* Experience & Contact */}
          <div
            style={{
              background: "#fff",
              borderRadius: "0 0 0 0",
              padding: "32px 40px 0 120px",
              minHeight: 340,
            }}
          >
            <Title
              level={3}
              style={{
                color: "#2c3a4d",
                marginBottom: 16,
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              Experience
            </Title>
            <div style={{ marginBottom: 18 }}>
              <Text strong>2018-2020 | Borcelle Studio</Text>
              <div style={{ fontSize: 14, color: "#444" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Present
                sed sem massa. Morbi dapibus pretium tristique.
              </div>
            </div>
            <div>
              <Text strong>2022-2024 | Rímberio Studio</Text>
              <div style={{ fontSize: 14, color: "#444" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                velit velit, pharetra non vulputate a, dictum in orci.
              </div>
            </div>
          </div>
          {/* Contact */}
          <div
            style={{
              background: "#2c3a4d",
              color: "#fff",
              padding: "24px 40px 24px 120px",
              borderRadius: "0 0 0 0",
              minHeight: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#fff",
                marginBottom: 12,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Contact
            </Title>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
            >
              <PhoneOutlined style={{ marginRight: 8 }} />
              <span>123-456-7890</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
            >
              <MailOutlined style={{ marginRight: 8 }} />
              <span>hello@email.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              <span>123 Anywhere St., Any City, ST 12345</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Temporary;
