// import Helmet from "react-helmet";

// function Template1({ title, data }) {
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

//       <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800 md:mx-0 border-1">
//         <header className="text-center mb-6">
//           <h1 className="text-3xl font-bold">{name}</h1>
//           <p className="text-sm">{`${email}  ${phone} ${location}`}</p>
//         </header>

//         <section className="mb-6 ">
//           <h2 className="text-xl font-semibold border-b mb-2">
//             Career Objective
//           </h2>
//           <p>{objective}</p>
//         </section>

//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
//           <ul>
//             <li>
//               <strong>Bachelor of Computer Applications (BCA)</strong> - Silver
//               Oak College Of Computer Application (2023 - 2025)
//             </li>
//             <li>
//               <strong>Senior Secondary (XII), Commerce</strong> - Kishore
//               Gurunomal Kanjani School, 2023 (71.00%)
//             </li>
//             <li>
//               <strong>Secondary (X)</strong> - Bhagwati School, 2021 (60.00%)
//             </li>
//           </ul>
//         </section>

//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b mb-2">
//             Trainings / Certifications
//           </h2>
//           <ul>
//             <li>
//               CyberSecurity Workshop – Silver Oak University, Ahmedabad (Jul
//               2024)
//             </li>
//             <li>
//               Rock Paper Scissor Game – Silver Oak University, Ahmedabad (Feb
//               2024 - Apr 2024)
//             </li>
//           </ul>
//         </section>

//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
//           <div>
//             <h3 className="font-semibold">Innovative Assignment</h3>
//             <p>
//               Created a Rock-Scissor-Paper Game using HTML, CSS for UI, and
//               JavaScript for backend logic.
//             </p>
//           </div>
//           <div>
//             <h3 className="font-semibold mt-2">Rock Paper Scissor Game</h3>
//             <p>
//               Developed an interactive and responsive Rock Paper Scissor Game
//               using HTML, CSS, and JavaScript. Includes real-time feedback,
//               event handling, and game logic.
//             </p>
//           </div>
//         </section>

//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
//           <p>
//             HTML, CSS, JavaScript, Python, Java, SQL, C, C++, C#, PHP, .NET,
//             Django, Bootstrap, MySQL, MongoDB, MS-Excel, Effective Communication
//           </p>
//         </section>

//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b mb-2">
//             Extra Curricular Activities
//           </h2>
//           <ul>
//             <li>Participated in Cybersecurity Workshop</li>
//             <li>Participated in Code Dilemma (Silver Oak University)</li>
//           </ul>
//         </section>

//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b mb-2">
//             Additional Details
//           </h2>
//           <p>DOB: 20-06-2005</p>
//           <p>
//             Portfolio:{" "}
//             <a
//               href="https://codepen.io/sujal984/pen/KwPJLyq"
//               className="text-blue-600 underline"
//             >
//               Codepen Project
//             </a>
//           </p>
//         </section>
//       </div>
//     </>
//   );
// }

// export default Template1;

import React from "react";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";

import dayjs from "dayjs";
import {
  DownloadOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import html2pdf from "html2pdf.js";
import { Button } from "antd";

import { useRef } from "react";

function Template1({ title, data, newStep, stepNo, next, prev, reset }) {
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
  } = data || {};
  const pdfRef = useRef();
  const handleDownload = () => {
    if (pdfRef.current) {
      // Ensure element has finished rendering and layout is stable
      requestAnimationFrame(() => {
        const element = pdfRef.current;

        // Check if element has any height
        const { offsetHeight, offsetWidth } = element;
        if (offsetHeight === 0 || offsetWidth === 0) {
          console.error("PDF element has no visible content or height.");
          return;
        }

        html2pdf()
          .set({
            margin: 0.5,
            filename: "resume.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
          })
          .from(element)
          .save();
      });
    }
  };

  const formatDob = (dob) => {
    if (!dob) return "";
    if (dayjs.isDayjs(dob)) return dob.format("DD-MM-YYYY");
    if (typeof dob === "string" && dob.includes("-")) {
      return dayjs(dob).format("DD-MM-YYYY");
    }
    return dob;
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div
        ref={pdfRef}
        className="font-sans text-gray-800 maindiv-1"
        id="resume"
        style={{
          marginLeft: newStep ? "-11rem" : "20rem",
          height: newStep ? "auto" : "26rem",
          width: newStep ? "40rem" : "22rem",
          marginTop: newStep ? "6rem" : "3.1rem",
        }}
      >
        <header className="text-center mb-6">
          <span>
            {" "}
            <h1 className="text-3xl font-bold capitalize">
              {fname} {lname}
            </h1>
          </span>

          <span></span>
          <p className="text-sm">
            {[email, phone, location].filter(Boolean).join(" | ")}
          </p>
        </header>

        {objective && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">
              Career Objective
            </h2>
            <p>{objective}</p>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
            <ul className="list-disc ml-5">
              {education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.degree}</strong> - {edu.institute} ({edu.year})
                </li>
              ))}
            </ul>
          </section>
        )}

        {trainings.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">
              Trainings / Certifications
            </h2>
            <ul className="list-disc ml-5">
              {trainings.map((training, index) => (
                <li key={index}>{training.title}</li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold">{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
            <p>{data.skills.join(", ")}</p>
          </section>
        )}

        {activities.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">
              Extra Curricular Activities
            </h2>
            <ul className="list-disc ml-5">
              {activities.map((activity, index) => (
                <li key={index}>{activity} </li>
              ))}
            </ul>
          </section>
        )}

        {(dob || portfolio) && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">
              Additional Details
            </h2>
            {dob && (
              <p>
                <strong>DOB:</strong> {formatDob(dob)}
              </p>
            )}
            {portfolio && (
              <p>
                <strong>Portfolio:</strong>{" "}
                <a
                  href={portfolio}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {portfolio}
                </a>
              </p>
            )}
          </section>
        )}
      </div>
      <div style={{}}>
        <div
          className="footer"
          style={{
            position: stepNo === 5 ? "absolute" : "none",
            // bottom: stepNo === 5 ? 0 : "none",
            marginTop: stepNo === 5 ? "60rem" : "31rem",
          }}
        >
          <div className="pb-5">
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
              <>
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
              </>
            ) : (
              <Button
                onClick={next}
                type="primary"
                className="py-3  mx-1.5  px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                Continue <ArrowRightOutlined className="ml-2 " />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Template1;
