import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import dayjs from "dayjs";
import {
  DownloadOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

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
      {/* 
      <div
        ref={pdfRef}
        className="font-sans text-gray-800 maindiv-1"
        id="resume"
        style={{
          marginLeft: newStep ? "-11rem" : "31rem",
          height: newStep ? "auto" : "30rem",

          width: newStep ? "40rem" : "22rem",
          marginTop: newStep ? "6rem" : "3.1rem",
        }}
      >
        <header className="text-center ">
          <span>
            {" "}
            <h1 className="text-3xl font-bold capitalize mb-1">
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
                <li key={index}>
                  {training.title} {training.date}
                  {training.organization && ` - ${training.organization}`}
                </li>
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
                  style={{ textDecoration: "none" }}
                >
                  {portfolio}
                </a>
              </p>
            )}
          </section>
        )}
      </div> */}
      <div
        ref={pdfRef}
        className="font-sans text-gray-800 maindiv-1"
        id="resume"
        style={{
          marginLeft: newStep ? "-11rem" : "",
          height: newStep ? "auto" : "100%",
          width: newStep ? "40rem" : "40vw",
          marginTop: newStep ? "6rem" : "3.1rem",
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold capitalize mb-1">
            {fname} {lname}
          </h1>
          <p className="text-sm text-gray-600">
            {[email, phone, location].filter(Boolean).join(" | ")}
          </p>
        </header>

        {objective && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b mb-2">
              Career Objective
            </h2>
            <p
              style={{ wordBreak: "break-word", whiteSpace: "normal" }}
              className="text-gray-700"
            >
              {objective}
            </p>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b mb-2">Education</h2>
            <ul className="list-disc ml-5">
              {education.map((edu, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{edu.degree}</strong> - {edu.institute} ({edu.year})
                </li>
              ))}
            </ul>
          </section>
        )}

        {trainings.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b mb-2">
              Trainings / Certifications
            </h2>
            <ul className="list-disc ml-5">
              {trainings.map((training, index) => (
                <li key={index} className="text-gray-700">
                  {training.title} {training.date}
                  {training.organization && ` - ${training.organization}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b mb-2">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold text-gray-800">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b mb-2">Skills</h2>
            <p className="text-gray-700">{data.skills.join(", ")}</p>
          </section>
        )}

        {activities.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b mb-2">
              Extra Curricular Activities
            </h2>
            <ul className="list-disc ml-5">
              {activities.map((activity, index) => (
                <li key={index} className="text-gray-700">
                  {activity}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(dob || portfolio) && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b mb-2">
              Additional Details
            </h2>
            {dob && (
              <p className="text-gray-700">
                <strong>DOB:</strong> {formatDob(dob)}
              </p>
            )}
            {portfolio && (
              <p className="text-gray-700">
                <strong>Portfolio:</strong>{" "}
                <a
                  href={portfolio}
                  className="text-blue-600 underline hover:text-blue-800 transition duration-200"
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
              className="py-3  mx-1.5 mr-0  px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Continue <ArrowRightOutlined />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Template1;
