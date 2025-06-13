import React from "react";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

      <div
        ref={pdfRef}
        className="font-sans text-gray-800 maindiv-1 w-full max-w-[40rem] mx-auto px-4 sm:px-6 lg:px-8"
        id="resume"
        style={{
          marginLeft: newStep ? "auto" : "20rem",
          height: newStep ? "auto" : "26rem",
          width: newStep ? "100%" : "22rem",
          marginTop: newStep ? "6rem" : "3.1rem",
        }}
      >
        <header className="text-center mb-6">
          <span>
            {" "}
            <h1 className="text-2xl sm:text-3xl font-bold capitalize">
              {fname} {lname}
            </h1>
          </span>

          <span></span>
          <p className="text-xs sm:text-sm break-words">
            {[email, phone, location].filter(Boolean).join(" | ")}
          </p>
        </header>

        {objective && (
          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold border-b mb-2">
              Career Objective
            </h2>
            <p className="text-sm sm:text-base">{objective}</p>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold border-b mb-2">
              Education
            </h2>
            <ul className="list-disc ml-5 text-sm sm:text-base">
              {education.map((edu, index) => (
                <li key={index} className="mb-1">
                  <strong>{edu.degree}</strong> - {edu.institute} ({edu.year})
                </li>
              ))}
            </ul>
          </section>
        )}

        {trainings.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold border-b mb-2">
              Trainings / Certifications
            </h2>
            <ul className="list-disc ml-5 text-sm sm:text-base">
              {trainings.map((training, index) => (
                <li key={index} className="mb-1">
                  {training.title} {training.date}
                  {training.organization && ` - ${training.organization}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold border-b mb-2">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold text-sm sm:text-base">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base">{project.description}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold border-b mb-2">
              Skills
            </h2>
            <p className="text-sm sm:text-base">{data.skills.join(", ")}</p>
          </section>
        )}

        {activities.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold border-b mb-2">
              Extra Curricular Activities
            </h2>
            <ul className="list-disc ml-5 text-sm sm:text-base">
              {activities.map((activity, index) => (
                <li key={index} className="mb-1">
                  {activity}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(dob || portfolio) && (
          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold border-b mb-2">
              Additional Details
            </h2>
            {dob && (
              <p className="text-sm sm:text-base">
                <strong>DOB:</strong> {formatDob(dob)}
              </p>
            )}
            {portfolio && (
              <p className="text-sm sm:text-base">
                <strong>Portfolio:</strong>{" "}
                <a
                  href={portfolio}
                  className="text-blue-600 underline break-all"
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
      <div className="w-full">
        <div
          className="footer w-full"
          style={{
            position: stepNo === 5 ? "absolute" : "none",
            marginTop: stepNo === 5 ? "60rem" : "31rem",
          }}
        >
          <div className="pb-5 flex flex-wrap justify-center gap-2">
            {stepNo > 0 && stepNo < 5 && (
              <Button
                onClick={prev}
                className="flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <ArrowLeftOutlined className="mr-2" /> Back
              </Button>
            )}

            {stepNo === 4 ? (
              <Button
                onClick={next}
                type="primary"
                className="py-2 sm:py-3 px-6 sm:px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                Submit & Review
              </Button>
            ) : stepNo === 5 ? (
              <>
                <Button
                  onClick={reset}
                  className="py-2 sm:py-3 px-4 sm:px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors"
                >
                  Reset Form
                </Button>
                <Button
                  type="primary"
                  onClick={handleDownload}
                  className="py-2 sm:py-3 px-6 sm:px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <DownloadOutlined className="mr-2" /> Download Resume
                </Button>
              </>
            ) : (
              <Button
                onClick={next}
                type="primary"
                className="py-2 sm:py-3 px-6 sm:px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                Continue <ArrowRightOutlined className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Template1;
