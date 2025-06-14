// import {
//   PhoneOutlined,
//   MailOutlined,
//   EnvironmentOutlined,
//   LinkedinOutlined,
//   ArrowRightOutlined,
//   ArrowLeftOutlined,
//   DownloadOutlined,
// } from "@ant-design/icons";

// import { Helmet } from "react-helmet";
// import dayjs from "dayjs";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { Button, Row, Col, Progress } from "antd";
// import { useRef } from "react";

// const Template2 = ({ title, data, newStep, stepNo, next, prev, reset }) => {
//   const formatDob = (dob) => {
//     if (!dob) return "";
//     if (dayjs.isDayjs(dob)) return dob.format("DD-MM-YYYY");
//     if (typeof dob === "string" && dob.includes("-")) {
//       return dayjs(dob).format("DD-MM-YYYY");
//     }
//     return dob;
//   };
//   const pdfRef = useRef();
//   const handleDownload = async () => {
//     if (!pdfRef.current) return;

//     await new Promise((resolve) => requestAnimationFrame(resolve));

//     const element = pdfRef.current;

//     const { offsetHeight, offsetWidth } = element;
//     if (offsetHeight === 0 || offsetWidth === 0) {
//       console.error("PDF element has no visible content.");
//       return;
//     }

//     try {
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("resume.pdf");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   return (
//     <>
//       <div
//         className="resume-container"
//         style={{
//           width: "700px",
//           minHeight: "810px",
//           margin: "40px auto",
//           background: "#fff",
//           borderRadius: "15px 15px 15px 15px",
//           boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
//           overflow: "hidden",
//         }}
//       >
//         <Row style={{ height: "auto " }}>
//           {/* Left Sidebar */}
//           <Col
//             xs={24}
//             md={5}
//             style={{
//               display: "flex",
//               position: "absolute",
//               borderRadius: "15px 15px 0px 0px",
//               backgroundColor: "#d1d5db",
//               zIndex: 1,
//               marginTop: "4rem",
//               marginLeft: "4rem",
//               height: "auto",
//               padding: "7.5px",

//               width: "13rem",
//             }}
//           >
//             <div
//               className="profile-sidebar "
//               style={{
//                 flex: 1,
//                 padding: "6px",
//                 borderTopRightRadius: "15px",
//                 borderTopLeftRadius: "12px",
//               }}
//             >
//               <div className="profile-image-wrapper ">
//                 <img
//                   src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e0966732-eaa1-4bc2-b965-912f1051691d.png"
//                   alt="Portrait of Olivia Wilson, graphic designer with a friendly smile"
//                 />
//               </div>

//               <div className="profile-section text-wrap">
//                 <h3 className="section-title">Profile</h3>
//                 <p className="profile-text text-break-all">
//                   {data.objective ||
//                     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed sem massa. Morbi dapibus pretium tristique. Quisque velit velit, pharetra non vulputate a, dictum in orci."}
//                 </p>
//               </div>
//               <div className="profile-section">
//                 <h3 className="section-title">Education</h3>
//                 <p className="education-text">
//                   Rimberio University{"\n"}
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.{"\n"}
//                   2014-2018
//                 </p>
//               </div>
//               <div className="profile-section">
//                 <h3 className="section-title">Skills</h3>
//                 <div className="skills-item">
//                   <span>Design</span>
//                   <Progress
//                     percent={85}
//                     showInfo={false}
//                     strokeColor="#1f2a40"
//                     trailColor="#e5e7eb"
//                     strokeWidth={8}
//                     style={{ width: "55%" }}
//                   />
//                 </div>
//                 <div className="skills-item">
//                   <span>Photography</span>
//                   <Progress
//                     percent={75}
//                     showInfo={false}
//                     strokeColor="#1f2a40"
//                     trailColor="#e5e7eb"
//                     strokeWidth={8}
//                     style={{ width: "55%" }}
//                   />
//                 </div>
//                 <div className="skills-item">
//                   <span>Copywriting</span>
//                   <Progress
//                     percent={65}
//                     showInfo={false}
//                     strokeColor="#1f2a40"
//                     trailColor="#e5e7eb"
//                     strokeWidth={8}
//                     style={{ width: "55%" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Col>
//           {/* Right Content Area */}
//           <Col span={24}>
//             <div
//               className="header-dark header"
//               style={{ height: "15rem", borderRadius: "15px  15px  0px 0px" }}
//             >
//               <div className="name " style={{ marginLeft: "17rem" }}>
//                 {" "}
//                 {data.fname} <br /> {data.lname}
//               </div>
//               <div className="title " style={{ marginLeft: "17rem" }}>
//                 Graphic Designer
//               </div>
//             </div>
//           </Col>
//           <Col
//             span={24}
//             xs={24}
//             md={14}
//             style={{
//               backgroundColor: "white",
//               minHeight: "100%",
//               marginLeft: "17rem",
//               width: "100%",
//             }}
//           >
//             <div className="experience-section ">
//               <h3 className="section-title">Experience</h3>
//               <div className="experience-item">
//                 <div className="experience-duration">
//                   <span className="experience-dot" />
//                   2018-2020
//                   <span className="experience-company">| Borcelle Studio</span>
//                 </div>
//                 <p className="experience-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Praesent sed sem massa. Morbi dapibus pretium tristique.
//                   Quisque velit velit, pharetra non vulputate a, dictum in orci.
//                 </p>
//               </div>
//               <div className="experience-item">
//                 <div className="experience-duration">
//                   <span className="experience-dot" />
//                   2022-2024
//                   <span className="experience-company">| Rimberio Studio</span>
//                 </div>
//                 <p className="experience-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Praesent sed sem massa. Morbi dapibus pretium tristique.
//                   Quisque velit velit, pharetra non vulputate a, dictum in orci.
//                 </p>
//               </div>
//             </div>
//           </Col>
//           <Col span={24}>
//             <div style={{ marginTop: "auto" }}>
//               <h3 className="section-title" style={{ paddingLeft: "19rem" }}>
//                 Contact
//               </h3>
//               <div
//                 className="contact-section "
//                 style={{
//                   marginLeft: "17rem",
//                   height: "9rem",
//                   padding: "15px",
//                 }}
//               >
//                 <div className="contact-item">
//                   <PhoneOutlined />
//                   <span>123-456-7890</span>
//                 </div>
//                 <div className="contact-item">
//                   <MailOutlined />
//                   <span>hello@reallygreatsite.com</span>
//                 </div>
//                 <div className="contact-item">
//                   <EnvironmentOutlined />
//                   <span>123 Anywhere St., Any City, ST 12345</span>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>

//       <div
//         className="footer"
//         style={{
//           position: stepNo === 5 ? "absolute" : "none",
//           marginTop: stepNo === 5 ? "60rem" : "38rem",
//         }}
//       >
//         <div
//           className="pb-5 "
//           style={{ display: "flex", justifyContent: "center" }}
//         >
//           {stepNo > 0 && stepNo < 5 && (
//             <Button
//               onClick={prev}
//               className="flex items-center py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
//               style={{ marginRight: 1 }}
//             >
//               <ArrowLeftOutlined className="mr-2" /> Back
//             </Button>
//           )}

//           {stepNo === 4 ? (
//             <Button
//               onClick={next}
//               type="primary"
//               className="py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
//             >
//               Submit & Review
//             </Button>
//           ) : stepNo === 5 ? (
//             <div>
//               <Button
//                 onClick={reset}
//                 className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
//               >
//                 Reset Form
//               </Button>
//               <Button
//                 type="primary"
//                 onClick={handleDownload}
//                 className="py-3 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
//               >
//                 <DownloadOutlined className="mr-2" /> Download Resume
//               </Button>
//             </div>
//           ) : (
//             <Button
//               onClick={next}
//               type="primary"
//               className="py-3  mx-1.5 mr-0  px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
//             >
//               Continue <ArrowRightOutlined />
//             </Button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Template2;

// import {
//   PhoneOutlined,
//   MailOutlined,
//   EnvironmentOutlined,
//   LinkedinOutlined,
//   ArrowRightOutlined,
//   ArrowLeftOutlined,
//   DownloadOutlined,
// } from "@ant-design/icons";

// import { Helmet } from "react-helmet";
// import dayjs from "dayjs";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { Button, Row, Col, Progress } from "antd";
// import { useRef } from "react";

// const Template2 = ({ title, data, newStep, stepNo, next, prev, reset }) => {
//   const {
//     fname = "",
//     lname = "",
//     email = "",
//     phone = "",
//     location = "",
//     objective = "",
//     education = [],
//     trainings = [],
//     projects = [],
//     skills = [],
//     activities = [],
//     dob = "",
//     portfolio = "",
//     linkedin = "",
//   } = data || {};

//   const formatDob = (dob) => {
//     if (!dob) return "";
//     if (dayjs.isDayjs(dob)) return dob.format("DD-MM-YYYY");
//     if (typeof dob === "string" && dob.includes("-")) {
//       return dayjs(dob).format("DD-MM-YYYY");
//     }
//     return dob;
//   };

//   const pdfRef = useRef();
//   const handleDownload = async () => {
//     if (!pdfRef.current) return;

//     await new Promise((resolve) => requestAnimationFrame(resolve));

//     const element = pdfRef.current;

//     const { offsetHeight, offsetWidth } = element;
//     if (offsetHeight === 0 || offsetWidth === 0) {
//       console.error("PDF element has no visible content.");
//       return;
//     }

//     try {
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("resume.pdf");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{title}</title>
//       </Helmet>

//       <div
//         ref={pdfRef}
//         className="resume-container"
//         style={{
//           width: "700px",
//           minHeight: "810px",
//           margin: "40px auto",
//           background: "#fff",
//           borderRadius: "15px 15px 15px 15px",
//           boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
//           overflow: "hidden",
//         }}
//       >
//         <Row style={{ height: "auto" }}>
//           {/* Left Sidebar */}
//           <Col
//             xs={24}
//             md={5}
//             style={{
//               display: "flex",
//               position: "absolute",
//               borderRadius: "15px 15px 0px 0px",
//               backgroundColor: "#d1d5db",
//               zIndex: 1,
//               marginTop: "4rem",
//               marginLeft: "4rem",
//               height: "auto",
//               padding: "7.5px",
//               width: "13rem",
//             }}
//           >
//             <div
//               className="profile-sidebar"
//               style={{
//                 flex: 1,
//                 padding: "6px",
//                 borderTopRightRadius: "15px",
//                 borderTopLeftRadius: "12px",
//               }}
//             >
//               {portfolio && (
//                 <div className="profile-image-wrapper">
//                   <img src={portfolio} alt={`Portrait of ${fname} ${lname}`} />
//                 </div>
//               )}

//               <div className="profile-section text-wrap">
//                 <h3 className="section-title">Profile</h3>
//                 <p className="profile-text text-break-all">
//                   {objective || "No objective provided"}
//                 </p>
//               </div>

//               {education.length > 0 && (
//                 <div className="profile-section">
//                   <h3 className="section-title">Education</h3>
//                   {education.map((edu, index) => (
//                     <p key={index} className="education-text">
//                       {edu.institute}
//                       <br />
//                       {edu.degree}
//                       <br />
//                       {edu.year}
//                     </p>
//                   ))}
//                 </div>
//               )}

//               {skills.length > 0 && (
//                 <div className="profile-section">
//                   <h3 className="section-title">Skills</h3>
//                   {skills.map((skill, index) => (
//                     <div key={index} className="skills-item">
//                       <span>{skill}</span>
//                       <Progress
//                         percent={Math.floor(Math.random() * 50) + 50} // Random progress between 50-100%
//                         showInfo={false}
//                         strokeColor="#1f2a40"
//                         trailColor="#e5e7eb"
//                         strokeWidth={8}
//                         style={{ width: "55%" }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </Col>

//           {/* Right Content Area */}
//           <Col span={24}>
//             <div
//               className="header-dark header"
//               style={{ height: "15rem", borderRadius: "15px  15px  0px 0px" }}
//             >
//               <div className="name" style={{ marginLeft: "17rem" }}>
//                 {fname} <br /> {lname}
//               </div>
//               <div className="title" style={{ marginLeft: "17rem" }}>
//                 {trainings.length > 0 ? trainings[0].title : "Professional"}
//               </div>
//             </div>
//           </Col>

//           <Col
//             span={24}
//             xs={24}
//             md={14}
//             style={{
//               backgroundColor: "white",
//               minHeight: "100%",
//               marginLeft: "17rem",
//               width: "100%",
//             }}
//           >
//             {(projects.length > 0 || trainings.length > 0) && (
//               <div className="experience-section">
//                 <h3 className="section-title">Experience</h3>
//                 {projects.map((project, index) => (
//                   <div key={index} className="experience-item">
//                     <div className="experience-duration">
//                       <span className="experience-dot" />
//                       {project.year || "Present"}
//                       <span className="experience-company">
//                         | {project.title}
//                       </span>
//                     </div>
//                     <p className="experience-text">{project.description}</p>
//                   </div>
//                 ))}
//                 {trainings.map((training, index) => (
//                   <div key={index} className="experience-item">
//                     <div className="experience-duration">
//                       <span className="experience-dot" />
//                       {training.date || "Present"}
//                       <span className="experience-company">
//                         | {training.organization || training.title}
//                       </span>
//                     </div>
//                     <p className="experience-text">
//                       {training.description || training.title}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activities.length > 0 && (
//               <div className="experience-section">
//                 <h3 className="section-title">Activities</h3>
//                 {activities.map((activity, index) => (
//                   <div key={index} className="experience-item">
//                     <p className="experience-text">{activity}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Col>

//           <Col span={24}>
//             <div style={{ marginTop: "auto" }}>
//               <h3 className="section-title" style={{ paddingLeft: "19rem" }}>
//                 Contact
//               </h3>
//               <div
//                 className="contact-section"
//                 style={{
//                   marginLeft: "17rem",
//                   height: "9rem",
//                   padding: "15px",
//                 }}
//               >
//                 {phone && (
//                   <div className="contact-item">
//                     <PhoneOutlined />
//                     <span>{phone}</span>
//                   </div>
//                 )}
//                 {email && (
//                   <div className="contact-item">
//                     <MailOutlined />
//                     <span>{email}</span>
//                   </div>
//                 )}
//                 {location && (
//                   <div className="contact-item">
//                     <EnvironmentOutlined />
//                     <span>{location}</span>
//                   </div>
//                 )}
//                 {linkedin && (
//                   <div className="contact-item">
//                     <LinkedinOutlined />
//                     <span>{linkedin}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>

//       <div
//         className="footer"
//         style={{
//           position: stepNo === 5 ? "absolute" : "none",
//           marginTop: stepNo === 5 ? "60rem" : "38rem",
//         }}
//       >
//         <div
//           className="pb-5"
//           style={{ display: "flex", justifyContent: "center" }}
//         >
//           {stepNo > 0 && stepNo < 5 && (
//             <Button
//               onClick={prev}
//               className="flex items-center py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
//               style={{ marginRight: 1 }}
//             >
//               <ArrowLeftOutlined className="mr-2" /> Back
//             </Button>
//           )}

//           {stepNo === 4 ? (
//             <Button
//               onClick={next}
//               type="primary"
//               className="py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
//             >
//               Submit & Review
//             </Button>
//           ) : stepNo === 5 ? (
//             <div>
//               <Button
//                 onClick={reset}
//                 className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
//               >
//                 Reset Form
//               </Button>
//               <Button
//                 type="primary"
//                 onClick={handleDownload}
//                 className="py-3 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
//               >
//                 <DownloadOutlined className="mr-2" /> Download Resume
//               </Button>
//             </div>
//           ) : (
//             <Button
//               onClick={next}
//               type="primary"
//               className="py-3 mx-1.5 mr-0 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
//             >
//               Continue <ArrowRightOutlined />
//             </Button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Template2;

import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { Helmet } from "react-helmet";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, Row, Col, Progress } from "antd";
import { useRef } from "react";

const Template2 = ({ title, data, newStep, stepNo, next, prev, reset }) => {
  const {
    fname = "",
    lname = "",
    email = "",
    phone = "",
    location = "",
    objective = "",
    education = [],
    trainings = [],
    projects = [],
    skills = [],
    activities = [],
    dob = "",
    portfolio = "",
    linkedin = "",
  } = data || {};

  const formatDob = (dob) => {
    if (!dob) return "";
    if (dayjs.isDayjs(dob)) return dob.format("DD-MM-YYYY");
    if (typeof dob === "string" && dob.includes("-")) {
      return dayjs(dob).format("DD-MM-YYYY");
    }
    return dob;
  };

  const pdfRef = useRef();
  const handleDownload = async () => {
    if (!pdfRef.current) return;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const element = pdfRef.current;

    const { offsetHeight, offsetWidth } = element;
    if (offsetHeight === 0 || offsetWidth === 0) {
      console.error("PDF element has no visible content.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div
        ref={pdfRef}
        className="resume-container"
        style={{
          width: "700px",
          minHeight: "810px",
          margin: "40px auto",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "200px",
            height: "100%",
            backgroundColor: "#d1d5db",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {portfolio && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={portfolio}
                alt={`Portrait of ${fname} ${lname}`}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid white",
                }}
              />
            </div>
          )}

          {objective && (
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1f2a40",
                  paddingBottom: "5px",
                  marginBottom: "10px",
                }}
              >
                PROFILE
              </h3>
              <p style={{ fontSize: "12px", lineHeight: "1.5" }}>{objective}</p>
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1f2a40",
                  paddingBottom: "5px",
                  marginBottom: "10px",
                }}
              >
                EDUCATION
              </h3>
              {education.map((edu, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "3px",
                    }}
                  >
                    {edu.degree}
                  </p>
                  <p style={{ fontSize: "12px", marginBottom: "3px" }}>
                    {edu.institute}
                  </p>
                  <p style={{ fontSize: "12px", color: "#666" }}>{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1f2a40",
                  paddingBottom: "5px",
                  marginBottom: "10px",
                }}
              >
                SKILLS
              </h3>
              {skills.map((skill, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      marginBottom: "5px",
                      fontWeight: "500",
                    }}
                  >
                    {skill}
                  </p>
                  <Progress
                    percent={Math.floor(Math.random() * 50) + 50}
                    showInfo={false}
                    strokeColor="#1f2a40"
                    trailColor="#e5e7eb"
                    strokeWidth={8}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div
          style={{
            marginLeft: "200px",
            padding: "30px",
            minHeight: "100%",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#1f2a40",
              color: "white",
              padding: "30px",
              margin: "-30px -30px 30px -30px",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "5px",
                textTransform: "uppercase",
              }}
            >
              {fname} {lname}
            </h1>
            <p
              style={{
                fontSize: "16px",
                opacity: 0.8,
              }}
            >
              {trainings.length > 0 ? trainings[0].title : "Professional"}
            </p>
          </div>

          {/* Experience Section */}
          {(projects.length > 0 || trainings.length > 0) && (
            <div style={{ marginBottom: "30px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1f2a40",
                  paddingBottom: "5px",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                }}
              >
                EXPERIENCE
              </h2>

              {projects.map((project, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.year && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        {project.year}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
                    {project.description}
                  </p>
                </div>
              ))}

              {trainings.map((training, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {training.organization || training.title}
                    </h3>
                    {training.date && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        {training.date}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
                    {training.description || training.title}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Activities Section */}
          {activities.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #1f2a40",
                  paddingBottom: "5px",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                }}
              >
                ACTIVITIES
              </h2>
              <ul style={{ paddingLeft: "20px" }}>
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "12px",
                      marginBottom: "8px",
                      lineHeight: "1.5",
                    }}
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Section */}
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                borderBottom: "2px solid #1f2a40",
                paddingBottom: "5px",
                marginBottom: "15px",
                textTransform: "uppercase",
              }}
            >
              CONTACT
            </h2>
            <div style={{ display: "grid", gap: "10px" }}>
              {phone && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PhoneOutlined style={{ marginRight: "10px" }} />
                  <span style={{ fontSize: "12px" }}>{phone}</span>
                </div>
              )}
              {email && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MailOutlined style={{ marginRight: "10px" }} />
                  <span style={{ fontSize: "12px" }}>{email}</span>
                </div>
              )}
              {location && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <EnvironmentOutlined style={{ marginRight: "10px" }} />
                  <span style={{ fontSize: "12px" }}>{location}</span>
                </div>
              )}
              {linkedin && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LinkedinOutlined style={{ marginRight: "10px" }} />
                  <span style={{ fontSize: "12px" }}>{linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div
        className="footer"
        style={{
          position: stepNo === 5 ? "absolute" : "none",
          marginTop: stepNo === 5 ? "60rem" : "38rem",
        }}
      >
        <div
          className="pb-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {stepNo > 0 && stepNo < 5 && (
            <Button
              onClick={prev}
              className="flex items-center py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              style={{ marginRight: 1 }}
            >
              <ArrowLeftOutlined className="mr-2" /> Back
            </Button>
          )}

          {stepNo === 4 ? (
            <Button
              onClick={next}
              type="primary"
              className="py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
            >
              Submit & Review
            </Button>
          ) : stepNo === 5 ? (
            <div>
              <Button
                onClick={reset}
                className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
              >
                Reset Form
              </Button>
              <Button
                type="primary"
                onClick={handleDownload}
                className="py-3 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
              >
                <DownloadOutlined className="mr-2" /> Download Resume
              </Button>
            </div>
          ) : (
            <Button
              onClick={next}
              type="primary"
              className="py-3 mx-1.5 mr-0 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Continue <ArrowRightOutlined />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Template2;
