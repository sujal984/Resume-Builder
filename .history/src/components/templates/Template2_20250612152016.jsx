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
import { Button } from "antd";
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
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div
        className="bg-white rounded shadow-md overflow-auto p-4 text-gray-800"
        style={{
          height: "26rem",
          width: "22rem",
          marginTop: "3.1rem",
          marginLeft: "20rem",
          position: "absolute",
          fontSize: "0.75rem", // ~text-xs
        }}
      >
        {/* Profile Header */}
        <div className="text-center mb-3">
          <h2 className="text-base font-bold truncate">
            {data.fname}&nbsp;
            {data.lname}
          </h2>
          <p className="uppercase text-[0.6rem] text-gray-500">
            {data.dob && formatDob(data.dob)}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-2">
          <h3 className="font-semibold border-b border-gray-300 text-sm">
            Contact
          </h3>
          <div className="space-y-1 mt-1">
            <p>
              <PhoneOutlined className="mr-1" /> {data.phone}
            </p>
            <p>
              <MailOutlined className="mr-1" /> {data.email}
            </p>
            <p>
              <EnvironmentOutlined className="mr-1" /> {data.location}
            </p>
            {data.linkedin && (
              <p>
                <LinkedinOutlined className="mr-1" /> {data.linkedin}
              </p>
            )}
          </div>
        </div>

        {/* Education */}
        {(data.education || []).length > 0 && (
          <div className="mb-2">
            <h3 className="font-semibold border-b border-gray-300 text-sm">
              Education
            </h3>
            <div className="mt-1 space-y-1">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-bold text-[0.7rem] truncate">
                    {edu.institute}
                  </p>
                  <p className="text-[0.65rem]">
                    {edu.degree} {}• {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(data.skills || []).length > 0 && (
          <div className="mb-2">
            <h3 className="font-semibold border-b border-gray-300 text-sm">
              Skills
            </h3>
            <ul className="list-disc list-inside pl-2 mt-1">
              {data.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Profile / Objective */}
        {data.objective && (
          <div className="mb-2">
            <h3 className="font-semibold border-b border-gray-300 text-sm">
              Profile
            </h3>
            <p className="mt-1">{data.objective}</p>
          </div>
        )}

        {/* Projects / Experience */}
        {(data.projects || []).length > 0 && (
          <div className="mb-2">
            <h3 className="font-semibold border-b border-gray-300 text-sm">
              Projects
            </h3>
            <div className="mt-1 space-y-1">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <p className="font-bold truncate">{proj.title}</p>
                  <p className="text-[0.65rem]">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {(data.activities || []).length > 0 && (
          <div className="mb-2">
            <h3 className="font-semibold border-b border-gray-300 text-sm">
              Activities
            </h3>
            <ul className="list-disc list-inside text-[0.65rem] mt-1 pl-2">
              {data.activities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirement */}
        {data.requirement && (
          <div className="mb-2">
            <h3 className="font-semibold border-b border-gray-300 text-sm">
              Requirement
            </h3>
            <p className="mt-1">{data.requirement}</p>
          </div>
        )}

        {/* References */}
        {(data.references || []).length > 0 && (
          <div className="mb-2">
            <h3 className="font-semibold border-b border-gray-300 text-sm">
              References
            </h3>
            <div className="space-y-1 mt-1">
              {data.references.map((ref, i) => (
                <div key={i}>
                  <p className="font-bold text-[0.7rem]">{ref.name}</p>
                  <p className="text-[0.65rem]">{ref.title}</p>
                  {ref.phone && (
                    <p className="text-[0.65rem]">Phone: {ref.phone}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
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
