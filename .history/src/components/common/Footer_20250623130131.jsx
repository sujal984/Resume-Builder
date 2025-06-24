import { Row, Col, Button } from "antd";
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
      <section className="container-fluid footer ">
        <p className="footer-heading">
          <span>
            *The professionals using our tools have previously been employed by
            these organizations.
          </span>
        </p>
        <Row className="justify-center ">
          <Col className="flex flex-col " xs={{ span: 24 }} md={{ span: 6 }}>
            <div>
              <h1 className="heading">Zety</h1>
              <p className="my-4 w-[250px] break-words">
                Zety's resume templates and job-winning resume builder and cover
                letter generator are powered by the best career experts and
                data-driven career insights.
              </p>

              <Button
                type="primary"
                size="large"
                className="rounded-full  font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
                style={{
                  padding: "15px 25px 13px",
                }}
              >
                Create My Resume
              </Button>
            </div>
          </Col>
          <Col md={{ span: 4 }}>
            <p className="p-title">RESUME</p>
            <ul>
              {resume.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col md={{ span: 4 }}>
            <p className="p-title">CV</p>
            <ul>
              {cv.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col md={{ span: 4 }}>
            <p className="p-title">COVER LETTER</p>
            <ul>
              {coverLetter.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>

          <Col md={{ span: 4 }}>
            <p className="p-title">SUPPORT</p>
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
