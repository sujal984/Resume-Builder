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
    // <>
    //   <Helmet>
    //     <title>{title}</title>
    //   </Helmet>

    //   <div
    //     ref={pdfRef}
    //     id="resume"
    //     className="bg-white rounded shadow-md overflow-auto p-4 text-gray-800"
    //     style={{
    //       height: "26rem",
    //       width: "22rem",
    //       marginTop: "3.1rem",
    //       marginLeft: "20rem",
    //       position: "absolute",
    //       fontSize: "0.75rem", // ~text-xs
    //     }}
    //   >
    //     {/* Profile Header */}
    //     <div className="text-center mb-3">
    //       <h2 className="text-base font-bold truncate">
    //         {data.fname}&nbsp;
    //         {data.lname}
    //       </h2>
    //       <p className="uppercase text-[0.6rem] text-gray-500">
    //         {data.dob && formatDob(data.dob)}
    //       </p>
    //     </div>

    //     {/* Contact */}
    //     <div className="mb-2">
    //       <h3 className="font-semibold border-b border-gray-300 text-sm">
    //         Contact
    //       </h3>
    //       <div className="space-y-1 mt-1">
    //         <p>
    //           <PhoneOutlined className="mr-1" /> {data.phone}
    //         </p>
    //         <p>
    //           <MailOutlined className="mr-1" /> {data.email}
    //         </p>
    //         <p>
    //           <EnvironmentOutlined className="mr-1" /> {data.location}
    //         </p>
    //         {data.linkedin && (
    //           <p>
    //             <LinkedinOutlined className="mr-1" /> {data.linkedin}
    //           </p>
    //         )}
    //       </div>
    //     </div>

    //     {/* Education */}
    //     {(data.education || []).length > 0 && (
    //       <div className="mb-2">
    //         <h3 className="font-semibold border-b border-gray-300 text-sm">
    //           Education
    //         </h3>
    //         <div className="mt-1 space-y-1">
    //           {data.education.map((edu, i) => (
    //             <div key={i}>
    //               <p className="font-bold text-[0.7rem] truncate">
    //                 {edu.institute}
    //               </p>
    //               <p className="text-[0.65rem]">
    //                 {edu.degree} {}• {edu.year}
    //               </p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {/* Skills */}
    //     {(data.skills || []).length > 0 && (
    //       <div className="mb-2">
    //         <h3 className="font-semibold border-b border-gray-300 text-sm">
    //           Skills
    //         </h3>
    //         <ul className="list-disc list-inside pl-2 mt-1">
    //           {data.skills.map((s, i) => (
    //             <li key={i}>{s}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     )}

    //     {/* Profile / Objective */}
    //     {data.objective && (
    //       <div className="mb-2">
    //         <h3 className="font-semibold border-b border-gray-300 text-sm">
    //           Profile
    //         </h3>
    //         <p className="mt-1">{data.objective}</p>
    //       </div>
    //     )}

    //     {/* Projects / Experience */}
    //     {(data.projects || []).length > 0 && (
    //       <div className="mb-2">
    //         <h3 className="font-semibold border-b border-gray-300 text-sm">
    //           Projects
    //         </h3>
    //         <div className="mt-1 space-y-1">
    //           {data.projects.map((proj, i) => (
    //             <div key={i}>
    //               <p className="font-bold truncate">{proj.title}</p>
    //               <p className="text-[0.65rem]">{proj.description}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {/* Activities */}
    //     {(data.activities || []).length > 0 && (
    //       <div className="mb-2">
    //         <h3 className="font-semibold border-b border-gray-300 text-sm">
    //           Activities
    //         </h3>
    //         <ul className="list-disc list-inside text-[0.65rem] mt-1 pl-2">
    //           {data.activities.map((a, i) => (
    //             <li key={i}>{a}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     )}

    //     {/* Requirement */}
    //     {data.requirement && (
    //       <div className="mb-2">
    //         <h3 className="font-semibold border-b border-gray-300 text-sm">
    //           Requirement
    //         </h3>
    //         <p className="mt-1">{data.requirement}</p>
    //       </div>
    //     )}

    //     {/* References */}
    //     {(data.references || []).length > 0 && (
    //       <div className="mb-2">
    //         <h3 className="font-semibold border-b border-gray-300 text-sm">
    //           References
    //         </h3>
    //         <div className="space-y-1 mt-1">
    //           {data.references.map((ref, i) => (
    //             <div key={i}>
    //               <p className="font-bold text-[0.7rem]">{ref.name}</p>
    //               <p className="text-[0.65rem]">{ref.title}</p>
    //               {ref.phone && (
    //                 <p className="text-[0.65rem]">Phone: {ref.phone}</p>
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    //   <div
    //     className="footer"
    //     style={{
    //       position: stepNo === 5 ? "absolute" : "none",
    //       marginTop: stepNo === 5 ? "60rem" : "38rem",
    //     }}
    //   >
    //     <div
    //       className="pb-5 "
    //       style={{ display: "flex", justifyContent: "center" }}
    //     >
    //       {stepNo > 0 && stepNo < 5 && (
    //         <Button
    //           onClick={prev}
    //           className="flex items-center py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
    //           style={{ marginRight: 1 }}
    //         >
    //           <ArrowLeftOutlined className="mr-2" /> Back
    //         </Button>
    //       )}

    //       {stepNo === 4 ? (
    //         <Button
    //           onClick={next}
    //           type="primary"
    //           className="py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
    //         >
    //           Submit & Review
    //         </Button>
    //       ) : stepNo === 5 ? (
    //         <div>
    //           <Button
    //             onClick={reset}
    //             className="py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors mx-1.5"
    //           >
    //             Reset Form
    //           </Button>
    //           <Button
    //             type="primary"
    //             onClick={handleDownload}
    //             className="py-3 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all mx-1.5"
    //           >
    //             <DownloadOutlined className="mr-2" /> Download Resume
    //           </Button>
    //         </div>
    //       ) : (
    //         <Button
    //           onClick={next}
    //           type="primary"
    //           className="py-3  mx-1.5 mr-0  px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
    //         >
    //           Continue <ArrowRightOutlined />
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    // </>

    <>
      <div
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
        <Row style={{ height: "auto " }}>
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
                <p className="profile-text text-wrap">
                  {data.objective ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed sem massa. Morbi dapibus pretium tristique. Quisque velit velit, pharetra non vulputate a, dictum in orci."}
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
            <div
              className="header-dark header"
              style={{ height: "15rem", borderRadius: "15px  15px  0px 0px" }}
            >
              <div className="name " style={{ marginLeft: "17rem" }}>
                {" "}
                {data.fname} <br /> {data.lname}
              </div>
              <div className="title " style={{ marginLeft: "17rem" }}>
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
                  height: "9rem",
                  padding: "15px",
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

      <div
        className="footer"
        style={{
          position: stepNo === 5 ? "absolute" : "none",
          marginTop: stepNo === 5 ? "60rem" : "38rem",
        }}
      >
        <div
          className="pb-5 "
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
              className="py-3  mx-1.5 mr-0  px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
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
