// import Helmet from "react-helmet";
// import { Button } from "antd";
// import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

// function Template3({ data, title }) {
//   const {
//     name,
//     email,
//     phone,
//     location,
//     objective,
//     education = [],
//     trainings = [],
//     projects = [],
//     skills = [],
//     activities = [],
//     dob,
//     portfolio,
//   } = data || {};

//   return (
//     <>
//       <Helmet>
//         <title>{title}</title>
//       </Helmet>

//       <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800 border Template">
//         <header className="text-center mb-6">
//           <h1 className="text-3xl font-bold">{name}</h1>
//           <p className="text-sm">
//             {email} | {phone} | {location}
//           </p>
//         </header>

//         {objective && (
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold border-b mb-2">
//               Career Objective
//             </h2>
//             <p>{objective}</p>
//           </section>
//         )}

//         {education.length > 0 && (
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
//             <ul>
//               {education.map((edu, i) => (
//                 <li key={i}>
//                   <strong>{edu.degree}</strong> - {edu.institution} ({edu.year}){" "}
//                   {edu.details && `(${edu.details})`}
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {trainings.length > 0 && (
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold border-b mb-2">
//               Trainings / Certifications
//             </h2>
//             <ul>
//               {trainings.map((t, i) => (
//                 <li key={i}>
//                   {t.title} – {t.organization} ({t.date})
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {projects.length > 0 && (
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
//             {projects.map((p, i) => (
//               <div key={i}>
//                 <h3 className="font-semibold">{p.title}</h3>
//                 <p>{p.description}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         {skills.length > 0 && (
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
//             <p>{skills.join(", ")}</p>
//           </section>
//         )}

//         {activities.length > 0 && (
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold border-b mb-2">
//               Extra Curricular Activities
//             </h2>
//             <ul>
//               {activities.map((a, i) => (
//                 <li key={i}>{a}</li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {(dob || portfolio) && (
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold border-b mb-2">
//               Additional Details
//             </h2>
//             {dob && (
//               <p>
//                 <strong>DOB:</strong> {dob}
//               </p>
//             )}
//             {portfolio && (
//               <p>
//                 <strong>Portfolio:</strong>{" "}
//                 <a href={portfolio} className="text-blue-600 underline">
//                   {portfolio}
//                 </a>
//               </p>
//             )}
//           </section>
//         )}
//       </div>
//     </>
//   );
// }
// export default Template3;

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
          borderRadius: "15px 15px 15px 15px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <Row style={{ height: "auto" }}>
          {/* Left Sidebar */}
          <Col
            xs={24}
            md={5}
            style={{
              display: "flex",
              position: "absolute",
              borderRadius: "15px 15px 0px 0px",
              backgroundColor: "#d1d5db",
              zIndex: 1,
              marginTop: "4rem",
              marginLeft: "4rem",
              height: "auto",
              padding: "7.5px",
              width: "13rem",
            }}
          >
            <div
              className="profile-sidebar"
              style={{
                flex: 1,
                padding: "6px",
                borderTopRightRadius: "15px",
                borderTopLeftRadius: "12px",
              }}
            >
              {portfolio && (
                <div className="profile-image-wrapper">
                  <img src={portfolio} alt={`Portrait of ${fname} ${lname}`} />
                </div>
              )}

              <div className="profile-section text-wrap">
                <h3 className="section-title">Profile</h3>
                <p className="profile-text text-break-all">
                  {objective || "No objective provided"}
                </p>
              </div>

              {education.length > 0 && (
                <div className="profile-section">
                  <h3 className="section-title">Education</h3>
                  {education.map((edu, index) => (
                    <p key={index} className="education-text">
                      {edu.institute}
                      <br />
                      {edu.degree}
                      <br />
                      {edu.year}
                    </p>
                  ))}
                </div>
              )}

              {skills.length > 0 && (
                <div className="profile-section">
                  <h3 className="section-title">Skills</h3>
                  {skills.map((skill, index) => (
                    <div key={index} className="skills-item">
                      <span>{skill}</span>
                      <Progress
                        percent={Math.floor(Math.random() * 50) + 50} // Random progress between 50-100%
                        showInfo={false}
                        strokeColor="#1f2a40"
                        trailColor="#e5e7eb"
                        strokeWidth={8}
                        style={{ width: "55%" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          {/* Right Content Area */}
          <Col span={24}>
            <div
              className="header-dark header"
              style={{ height: "15rem", borderRadius: "15px  15px  0px 0px" }}
            >
              <div className="name" style={{ marginLeft: "17rem" }}>
                {fname} <br /> {lname}
              </div>
              <div className="title" style={{ marginLeft: "17rem" }}>
                {trainings.length > 0 ? trainings[0].title : "Professional"}
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
            {(projects.length > 0 || trainings.length > 0) && (
              <div className="experience-section">
                <h3 className="section-title">Experience</h3>
                {projects.map((project, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-duration">
                      <span className="experience-dot" />
                      {project.year || "Present"}
                      <span className="experience-company">
                        | {project.title}
                      </span>
                    </div>
                    <p className="experience-text">{project.description}</p>
                  </div>
                ))}
                {trainings.map((training, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-duration">
                      <span className="experience-dot" />
                      {training.date || "Present"}
                      <span className="experience-company">
                        | {training.organization || training.title}
                      </span>
                    </div>
                    <p className="experience-text">
                      {training.description || training.title}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activities.length > 0 && (
              <div className="experience-section">
                <h3 className="section-title">Activities</h3>
                {activities.map((activity, index) => (
                  <div key={index} className="experience-item">
                    <p className="experience-text">{activity}</p>
                  </div>
                ))}
              </div>
            )}
          </Col>

          <Col span={24}>
            <div style={{ marginTop: "auto" }}>
              <h3 className="section-title" style={{ paddingLeft: "19rem" }}>
                Contact
              </h3>
              <div
                className="contact-section"
                style={{
                  marginLeft: "17rem",
                  height: "9rem",
                  padding: "15px",
                }}
              >
                {phone && (
                  <div className="contact-item">
                    <PhoneOutlined />
                    <span>{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="contact-item">
                    <MailOutlined />
                    <span>{email}</span>
                  </div>
                )}
                {location && (
                  <div className="contact-item">
                    <EnvironmentOutlined />
                    <span>{location}</span>
                  </div>
                )}
                {linkedin && (
                  <div className="contact-item">
                    <LinkedinOutlined />
                    <span>{linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>

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
