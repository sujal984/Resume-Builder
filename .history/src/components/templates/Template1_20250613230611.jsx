import { Helmet } from "react-helmet";

import dayjs from "dayjs";

function Template1({ title, data, newStep, pdfRef }) {
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
          // height: newStep ? "auto" : "100%",
          // width: newStep ? "40rem" : "100%",

          justifySelf: "center",
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
                <p
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  className="text-gray-700"
                >
                  {project.description}
                </p>
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
    </>
  );
}

export default Template1;
