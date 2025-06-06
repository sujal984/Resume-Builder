import Helmet from "react-helmet";
import { Button } from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

function Template3({ data, title }) {
  const {
    name,
    email,
    phone,
    location,
    objective,
    education = [],
    trainings = [],
    projects = [],
    skills = [],
    activities = [],
    dob,
    portfolio,
  } = data || {};

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800 border Template">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-sm">
            {email} | {phone} | {location}
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
            <ul>
              {education.map((edu, i) => (
                <li key={i}>
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.year}){" "}
                  {edu.details && `(${edu.details})`}
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
            <ul>
              {trainings.map((t, i) => (
                <li key={i}>
                  {t.title} – {t.organization} ({t.date})
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
            {projects.map((p, i) => (
              <div key={i}>
                <h3 className="font-semibold">{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
            <p>{skills.join(", ")}</p>
          </section>
        )}

        {activities.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">
              Extra Curricular Activities
            </h2>
            <ul>
              {activities.map((a, i) => (
                <li key={i}>{a}</li>
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
                <strong>DOB:</strong> {dob}
              </p>
            )}
            {portfolio && (
              <p>
                <strong>Portfolio:</strong>{" "}
                <a href={portfolio} className="text-blue-600 underline">
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
export default Template3;
