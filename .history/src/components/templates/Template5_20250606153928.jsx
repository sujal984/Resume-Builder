<<<<<<< HEAD
import { Divider } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import dayjs from "dayjs";
function Template5({ title, data }) {
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
    dob = "27-05-2025",
    portfolio = "",
  } = data || {};
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="maindiv-5 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02]">
        <h1 className="capitalize" defaultValue={fname}>
          {fname} {lname}
        </h1>
        <Divider size="large" style={{ margin: 0 }} />
        <p>
          {email} {phone} &nbsp;
          <span>{location}</span>
        </p>
        <Divider size="large" style={{ margin: 2 }} />
        <div className="maindiv-sidebar">
          <h4 defaultValue={dob}>
            {" "}
            {dayjs.isDayjs(dob) ? dob.format("DD-MM-YYYY") : dob}
          </h4>
          <Divider size="large" style={{ margin: 2 }} />
          <p style={{ textAlign: "left" }}>
            <strong>Skill</strong>
          </p>
          <ul style={{ listStyleType: "disc" }}>
            {skills && skills.length > 0 ? (
              skills.map((skill, idx) => <li key={idx}>{skill}</li>)
            ) : (
              <li>No skills added</li>
            )}
          </ul>
        </div>
        i <div className="maindiv-content"></div>
      </div>
    </>
  );
=======
import React from "react";

function Template5() {
  return <div>Template5</div>;
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c
}

export default Template5;
