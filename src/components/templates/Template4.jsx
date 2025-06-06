<<<<<<< HEAD
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Divider, Row, Col, Button, Image } from "antd";

import { Helmet } from "react-helmet";

import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

const Template4 = ({ data, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="flex max-w-5xl mx-auto bg-white shadow-lg border rounded overflow-hidden maindiv-2">
        <div className="w-1/3 bg-gray-800 text-white p-6 space-y-6">
          <div className="text-center">
            <Image
              src="/public/Copy of SujaljainCV_page-0001.jpg"
              height={100}
              width={100}
              style={{ marginRight: "3rem" }}
            />

            <div className="w-full h-full bg-gray-400" />

            <h2 className="text-xl font-bold">{data.name}</h2>
            <p className="text-sm uppercase tracking-wide">Student, Fresher</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold border-b border-white mb-2">
              Contact
            </h3>
            <p>
              <PhoneOutlined /> {data.phone}
            </p>
            <p>
              <MailOutlined /> {data.email}
            </p>
            <p>
              <EnvironmentOutlined /> {data.location}
            </p>
            {data.linkedin && (
              <p>
                <LinkedinOutlined /> {data.linkedin}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold border-b border-white mb-2">
              Education
            </h3>
            {(data.education || []).map((edu, i) => (
              <div key={i}>
                <p className="text-sm">{edu.year}</p>
                <p className="font-bold">{edu.institution}</p>
                <p className="text-sm">{edu.degree}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold border-b border-white mb-2">
              Skills
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {(data.skills || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold border-b border-white mb-2">
              Languages
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {(data.languages || []).map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="w-2/3 p-6">
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <Divider className="my-2" />
            <p>{data.objective}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Work Experience
            </h2>
            <Divider className="my-2" />
            {(data.projects || []).map((proj, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{proj.title}</p>
                <p className="text-sm">{proj.description}</p>
              </div>
            ))}
            {(data.activities || []).length > 0 && (
              <ul className="list-disc list-inside text-sm mt-2">
                {(data.activities || []).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Requirement</h2>
            <Divider className="my-2" />
            <p>{data.requirement}</p>
          </section>

          {(data.references || []).length > 0 && (
            <section className="mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Reference</h2>
              <Divider className="my-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.references || []).map((ref, i) => (
                  <div key={i}>
                    <p className="font-bold">{ref.name}</p>
                    <p className="text-sm">{ref.title}</p>
                    {ref.phone && <p className="text-sm">Phone: {ref.phone}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};
=======
import React from "react";

function Template4() {
  return <div>Template4</div>;
}
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c

export default Template4;
