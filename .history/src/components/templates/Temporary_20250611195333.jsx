// import React from "react";
// import { Row, Col, Typography, Divider } from "antd";
// import {
//   PhoneOutlined,
//   MailOutlined,
//   EnvironmentOutlined,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;

// function Temporary() {
//   return (
//     <div
//       style={{
//         background: "#f5f5f5",
//         minHeight: "100vh",
//         padding: "2rem 0",
//       }}
//     >
//       <div
//         style={{
//           width: 800,
//           margin: "0 auto",
//           background: "#fff",
//           borderRadius: 12,
//           overflow: "hidden",
//           boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
//           display: "flex",
//         }}
//       >
//         {/* Sidebar */}
//         <div
//           style={{
//             width: 220,
//             background: "#e5e7eb",
//             padding: "0 0 0 0",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             position: "absolute",
//             marginTop: "6rem",
//             zIndex: 2,
//             marginLeft: "5rem",
//           }}
//         >
//           {/* Profile Image */}
//           <div
//             style={{
//               width: 120,
//               height: 120,
//               borderRadius: "50%",
//               background: "#fff",
//               border: "6px solid #2c3a4d",
//               marginTop: 36,
//               marginBottom: 24,
//               overflow: "hidden",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {/* <img src="..." alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
//           </div>
//           <div style={{ width: "80%", marginBottom: 24 }}>
//             <Text strong style={{ fontSize: 18, color: "#2c3a4d" }}>
//               Profile
//             </Text>
//             <div style={{ fontSize: 13, color: "#444", margin: "8px 0 20px" }}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Present
//               sed sem massa. Morbi dapibus pretium tristique.
//             </div>
//             <Text strong style={{ fontSize: 18, color: "#2c3a4d" }}>
//               Education
//             </Text>
//             <div style={{ fontSize: 13, color: "#444", margin: "8px 0 20px" }}>
//               Rímberio University
//               <br />
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               <br />
//               2016-2018
//             </div>
//             <Text strong style={{ fontSize: 18, color: "#2c3a4d" }}>
//               Skills
//             </Text>
//             <div style={{ marginTop: 8 }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginBottom: 8,
//                 }}
//               >
//                 <span style={{ flex: 1 }}>Design</span>
//                 <div
//                   style={{
//                     width: 60,
//                     height: 6,
//                     background: "#2c3a4d",
//                     borderRadius: 3,
//                     marginLeft: 8,
//                   }}
//                 />
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginBottom: 8,
//                 }}
//               >
//                 <span style={{ flex: 1 }}>Photography</span>
//                 <div
//                   style={{
//                     width: 40,
//                     height: 6,
//                     background: "#2c3a4d",
//                     borderRadius: 3,
//                     marginLeft: 8,
//                   }}
//                 />
//               </div>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <span style={{ flex: 1 }}>Copywriting</span>
//                 <div
//                   style={{
//                     width: 30,
//                     height: 6,
//                     background: "#2c3a4d",
//                     borderRadius: 3,
//                     marginLeft: 8,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div style={{ flex: 1, background: "#2c3a4d", position: "relative" }}>
//           {/* Header */}
//           <div
//             style={{ padding: "40px 40px 24px 120px", background: "#2c3a4d" }}
//           >
//             <Title
//               level={1}
//               style={{
//                 color: "#fff",
//                 marginBottom: 0,
//                 fontWeight: 700,
//                 letterSpacing: 1,
//                 fontSize: 38,
//               }}
//             >
//               OLIVIA
//               <br />
//               WILSON
//             </Title>
//             <Text style={{ color: "#cfd8e3", fontSize: 18 }}>
//               Graphic Designer
//             </Text>
//           </div>
//           {/* Experience & Contact */}
//           <div
//             style={{
//               background: "#fff",
//               borderRadius: "0 0 0 0",
//               padding: "32px 40px 0 120px",
//               minHeight: 340,
//             }}
//           >
//             <Title
//               level={3}
//               style={{
//                 color: "#2c3a4d",
//                 marginBottom: 16,
//                 fontWeight: 700,
//                 fontSize: 22,
//               }}
//             >
//               Experience
//             </Title>
//             <div style={{ marginBottom: 18 }}>
//               <Text strong>2018-2020 | Borcelle Studio</Text>
//               <div style={{ fontSize: 14, color: "#444" }}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Present
//                 sed sem massa. Morbi dapibus pretium tristique.
//               </div>
//             </div>
//             <div>
//               <Text strong>2022-2024 | Rímberio Studio</Text>
//               <div style={{ fontSize: 14, color: "#444" }}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
//                 velit velit, pharetra non vulputate a, dictum in orci.
//               </div>
//             </div>
//           </div>
//           {/* Contact */}
//           <div
//             style={{
//               background: "#2c3a4d",
//               color: "#fff",
//               padding: "24px 40px 24px 120px",
//               borderRadius: "0 0 0 0",
//               minHeight: 100,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Title
//               level={4}
//               style={{
//                 color: "#fff",
//                 marginBottom: 12,
//                 fontWeight: 700,
//                 fontSize: 18,
//               }}
//             >
//               Contact
//             </Title>
//             <div
//               style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
//             >
//               <PhoneOutlined style={{ marginRight: 8 }} />
//               <span>123-456-7890</span>
//             </div>
//             <div
//               style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
//             >
//               <MailOutlined style={{ marginRight: 8 }} />
//               <span>hello@email.com</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <EnvironmentOutlined style={{ marginRight: 8 }} />
//               <span>123 Anywhere St., Any City, ST 12345</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Temporary;

import React from "react";
import { Row, Col, Progress } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const ResumeTemplate = () => {
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
        <Row wrap={false} gutter={0}>
          {/* Left Sidebar */}
          <Col
            xs={24}
            md={8}
            style={{
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#d1d5db",
            }}
          >
            <div className="profile-sidebar" style={{ flex: 1 }}>
              <div className="profile-image-wrapper">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e0966732-eaa1-4bc2-b965-912f1051691d.png"
                  alt="Portrait of Olivia Wilson, graphic designer with a friendly smile"
                />
              </div>
              <div className="header-dark">
                <div className="name">Olivia Wilson</div>
                <div className="title">Graphic Designer</div>
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
          <Col
            xs={24}
            md={16}
            style={{ backgroundColor: "white", minHeight: "100%" }}
          >
            <div className="experience-section">
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
              <div style={{ marginTop: "auto" }}>
                <h3 className="section-title">Contact</h3>
                <div className="contact-section">
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
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ResumeTemplate;
