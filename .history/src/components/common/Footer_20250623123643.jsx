import { Row, Col } from "antd";
import React from "react";

const resume = [
  "Resume Builder",
  "Resume Templates",
  "Resume Checker",
  "Resume Examples",
  "Best Resume Format",
  "How to Write a Resume",
  "Resume Help",
];
const cv = [
  "CV Builder",
  "CV Templates",
  "CV Examples",
  "CV Format",
  "How to Write a CV",
  "CV Help",
];
const coverLetter = [
  "Cover Letter Builder",
  "Cover Letter Templates",
  "Cover Letter Examples",
  "Cover Letter Format",
  "How to Write a Cover Letter",
  "Cover Letter Help",
];
const support = [
  "About",
  "Pricing",
  "Contact",
  "Editorial Guidelines",
  "Media Mentions",
  "Accessibility",
  "Affiliates",
  "Privacy Policy",
  "Terms of service",
  "Cookies & Tracking Policy",
  "Do Not Sell or Share My Personal Information",
];
function Footer() {
  return (
    <>
      <section className="container-fluid footer">
        <p>
          <span>
            *The professionals using our tools have previously been employed by
            these organizations.
          </span>
        </p>
        <Row gutter={16}>
          <Col
            className="flex flex-col gap-4"
            xs={{ span: 24 }}
            md={{ span: 5 }}
          ></Col>
          <Col md={{ span: 5 }}>
            <ul>
              {resume.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col md={{ span: 5 }}>
            <ul>
              {cv.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col md={{ span: 5 }}>
            <ul>
              {coverLetter.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col md={{ span: 5 }}>
            <ul>
              {support.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </section>
    </>
  );
}

export default Footer;
