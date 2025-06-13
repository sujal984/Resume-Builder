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
      <style>{`
        .resume-container {
          max-width: 900px;
          margin: 2rem auto;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
          background-color: white;
        }
        .profile-sidebar {
          background-color: #d1d5db; /* light gray */
          padding: 2rem 1.5rem 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100%;
        }
        .profile-image-wrapper {
          border: 6px solid #1f2a40; /* dark navy */
          border-radius: 50%;
          width: 110px;
          height: 110px;
          overflow: hidden;
          margin-bottom: 2rem;
          background-color: #f3f4f6; /* light background fallback */
        }
        .profile-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 50%;
        }
        .header-dark {
          background-color: #1f2a40; /* dark navy */
          color: white;
          padding: 3rem 2rem 3rem 2rem;
          text-align: left;
          height: 140px;
          border-radius: 0 0 0 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .name {
          font-weight: 900;
          font-size: 1.9rem;
          letter-spacing: 0.02em;
          margin-bottom: 6px;
          line-height: 1.1;
        }
        .title {
          font-weight: 400;
          font-size: 1rem;
          opacity: 0.8;
        }
        .profile-section {
          width: 100%;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }
        .section-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
          color: #374151; /* gray-700 */
        }
        .profile-text {
          font-size: 0.85rem;
          line-height: 1.4;
          color: #4b5563; /* gray-600 */
          white-space: pre-wrap;
        }
        .education-text {
          font-size: 0.85rem;
          color: #4b5563; /* gray-600 */
          margin-top: 0.3rem;
          line-height: 1.4;
        }
        .experience-section {
          padding: 2rem 2rem 3rem 2rem;
          background-color: white;
          min-height: 100%;
        }
        .experience-item {
          margin-bottom: 2rem;
        }
        .experience-duration {
          font-weight: 700;
          color: #1f2a40; /* dark navy */
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }
        .experience-dot {
          width: 10px;
          height: 10px;
          background-color: #1f2a40;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        .experience-company {
          font-weight: 700;
          margin-left: 0.3rem;
        }
        .experience-text {
          font-size: 0.85rem;
          color: #4b5563;
          line-height: 1.4;
          white-space: pre-wrap;
        }
        .skills-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: #374151; /* gray-700 */
        }
        .skills-item {
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #374151;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .contact-section {
          background-color: #1f2a40;
          color: white;
          padding: 1.8rem 2rem;
          border-radius: 12px 12px 0 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 0.9rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .contact-item svg {
          font-size: 1rem;
          color: white;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .resume-container {
            margin: 1rem;
            border-radius: 8px;
            box-shadow: none;
          }
          .profile-sidebar,
          .experience-section {
            min-height: auto;
            padding: 1rem 1rem 2rem 1rem;
          }
          .header-dark {
            height: auto;
            padding: 2rem 1rem 2rem 1rem;
            border-radius: 0 0 12px 12px;
            text-align: center;
          }
          .name {
            font-size: 1.6rem;
          }
          .title {
            font-size: 0.9rem;
          }
          .contact-section {
            border-radius: 0 0 12px 12px;
          }
        }
      `}</style>
      <div className="resume-container">
        <Row style={{ height: "100%" }}>
          {/* Left Sidebar */}
          <Col
            xs={24}
            md={5}
            style={{
              minHeight: "100%",
              display: "flex",
              position: "absolute",
              flexDirection: "column",
              backgroundColor: "#d1d5db",
              zIndex: 1,
              marginTop: "6rem",
              marginLeft: "10rem",
              height: "100%",
            }}
          >
            <div className="profile-sidebar " style={{ flex: 1 }}>
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
            <div className="header-dark header">
              <div className="name " style={{ marginLeft: "30rem" }}>
                {" "}
                Olivia Wilson
              </div>
              <div className="title " style={{ marginLeft: "30rem" }}>
                Graphic Designer
              </div>
            </div>
          </Col>
          <Col
            span={24}
            xs={24}
            md={24}
            style={{
              backgroundColor: "white",
              minHeight: "100%",
              marginLeft: "25rem",
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
              <h3 className="section-title" style={{ marginLeft: "27rem" }}>
                Contact
              </h3>
              <div className="contact-section" style={{ paddingLeft: "27rem" }}>
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
