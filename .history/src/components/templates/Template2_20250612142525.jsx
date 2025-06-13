import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

import { Helmet } from "react-helmet";
import dayjs from "dayjs";

const Template2 = ({ title, data, newStep, stepNo, next, prev, reset }) => {
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
    </>
  );
};

export default Template2;
