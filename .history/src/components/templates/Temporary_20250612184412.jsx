import React from "react";
import { Row, Col, Progress } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const Temporary = () => {
  return (
    <>
      <div
        className="resume-container"
        style={{
          width: "700px",
          minHeight: "810px",
          margin: "40px auto",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <Row style={{ height: "auto " }}>
          {/* Left Sidebar */}
          <Col
            xs={24}
            md={5}
            style={{
              display: "flex",
              position: "absolute",

              backgroundColor: "#d1d5db",
              zIndex: 1,
              marginTop: "4rem",
              marginLeft: "4rem",
              height: "auto",
              padding: "6px",

              width: "13rem",
            }}
          >
            <div
              className="profile-sidebar "
              style={{
                flex: 1,
                padding: "6px",
                borderTopRightRadius: "15px",
                borderTopLeftRadius: "12px",
              }}
            >
              <div className="profile-image-wrapper ">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e0966732-eaa1-4bc2-b965-912f1051691d.png"
                  alt="Portrait of Olivia Wilson, graphic designer with a friendly smile"
                />
              </div>

              <div className="profile-section">
                <h3 className="section-title">Profile</h3>
                <p className="profile-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent sed sem massa. Morbi dapibus pretium tristique.
                  Quisque velit velit, pharetra non vulputate a, dictum in orci.
                </p>
              </div>
              <div className="profile-section">
                <h3 className="section-title">Education</h3>
                <p className="education-text">
                  Rimberio University{"\n"}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.{"\n"}
                  2014-2018
                </p>
              </div>
              <div className="profile-section">
                <h3 className="section-title">Skills</h3>
                <div className="skills-item">
                  <span>Design</span>
                  <Progress
                    percent={85}
                    showInfo={false}
                    strokeColor="#1f2a40"
                    trailColor="#e5e7eb"
                    strokeWidth={8}
                    style={{ width: "55%" }}
                  />
                </div>
                <div className="skills-item">
                  <span>Photography</span>
                  <Progress
                    percent={75}
                    showInfo={false}
                    strokeColor="#1f2a40"
                    trailColor="#e5e7eb"
                    strokeWidth={8}
                    style={{ width: "55%" }}
                  />
                </div>
                <div className="skills-item">
                  <span>Copywriting</span>
                  <Progress
                    percent={65}
                    showInfo={false}
                    strokeColor="#1f2a40"
                    trailColor="#e5e7eb"
                    strokeWidth={8}
                    style={{ width: "55%" }}
                  />
                </div>
              </div>
            </div>
          </Col>
          {/* Right Content Area */}
          <Col span={24}>
            <div className="header-dark header" style={{ height: "15rem" }}>
              <div className="name " style={{ marginLeft: "18rem" }}>
                {" "}
                Olivia <br /> Wilson
              </div>
              <div className="title " style={{ marginLeft: "20rem" }}>
                Graphic Designer
              </div>
            </div>
          </Col>
          <Col
            span={24}
            xs={24}
            md={14}
            style={{
              backgroundColor: "white",
              minHeight: "100%",
              marginLeft: "17rem",
              width: "100%",
            }}
          >
            <div className="experience-section ">
              <h3 className="section-title">Experience</h3>
              <div className="experience-item">
                <div className="experience-duration">
                  <span className="experience-dot" />
                  2018-2020
                  <span className="experience-company">| Borcelle Studio</span>
                </div>
                <p className="experience-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent sed sem massa. Morbi dapibus pretium tristique.
                  Quisque velit velit, pharetra non vulputate a, dictum in orci.
                </p>
              </div>
              <div className="experience-item">
                <div className="experience-duration">
                  <span className="experience-dot" />
                  2022-2024
                  <span className="experience-company">| Rimberio Studio</span>
                </div>
                <p className="experience-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent sed sem massa. Morbi dapibus pretium tristique.
                  Quisque velit velit, pharetra non vulputate a, dictum in orci.
                </p>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div style={{ marginTop: "auto" }}>
              <h3 className="section-title" style={{ paddingLeft: "19rem" }}>
                Contact
              </h3>
              <div
                className="contact-section "
                style={{
                  marginLeft: "17rem",
                  height: "8rem",
                  padding: "10px",
                }}
              >
                <div className="contact-item">
                  <PhoneOutlined />
                  <span>123-456-7890</span>
                </div>
                <div className="contact-item">
                  <MailOutlined />
                  <span>hello@reallygreatsite.com</span>
                </div>
                <div className="contact-item">
                  <EnvironmentOutlined />
                  <span>123 Anywhere St., Any City, ST 12345</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Temporary;
