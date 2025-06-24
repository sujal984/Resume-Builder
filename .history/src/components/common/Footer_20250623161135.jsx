import { Row, Col, Button } from "antd";
import {
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "../../assets/extraImages";

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
const footerLink = [
  "English (IN)",
  "English (UK)",
  "English (US)",
  "Deutsch Español",
  "Français (Canada)",
  " Français (France)",
  "Italiano Polski",
  " Portugês (Brasil)",
];
function Footer() {
  return (
    <footer className="footer">
      <p className="footer-heading">
        <span>
          *The professionals using our tools have previously been employed by
          these organizations.
        </span>
      </p>
      <div className="container mx-auto ">
        <Row className=" justify-between py-5">
          <Col
            className="flex xs:flex-row md:flex-col "
            xs={{ span: 24 }}
            ld={{ span: 5 }}
          >
            <div>
              <h1 className="heading">Zety</h1>
              <p className="my-4 w-[250px] break-words ">
                Zety's resume templates and job-winning resume builder and cover
                letter generator are powered by the best career experts and
                data-driven career insights.
              </p>

              <Button
                type="primary"
                size="large"
                className="rounded-full  font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 "
                style={{
                  padding: "15px 25px 13px",
                }}
              >
                Create My Resume
              </Button>
              <div>
                <div className="flex gap-4 my-4 connection">
                  <TwitterIcon /> <LinkedinIcon /> <FacebookIcon />
                </div>
                <div>
                  <p className="mb-2"> Call us: &nbsp; 800-555-5555</p>
                  <p>Email: &nbsp; support@zety.com</p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={{ span: 3 }} xs={{ span: 12 }}>
            <p className="p-title">RESUME</p>
            <ul>
              {resume.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col md={{ span: 3 }} xs={{ span: 24 }}>
            <p className="p-title">CV</p>
            <ul>
              {cv.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col md={{ span: 3 }} xs={{ span: 24 }}>
            <p className="p-title">COVER LETTER</p>
            <ul>
              {coverLetter.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>

          <Col md={{ span: 3 }} xs={{ span: 24 }}>
            <p className="p-title">SUPPORT</p>
            <ul>
              {support.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>

      <div className="w-full region">
        <div className="container mx-auto flex justify-center  items-center gap-4 py-4">
          <p className="text-sm font-medium !mt-0 p-title">
            Choose Your Region
          </p>
          <div className="flex gap-4 flex-wrap">
            {footerLink.map((item, idx) => (
              <span
                key={idx}
                className="text-sm cursor-pointer hover:underline"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex container mx-auto justify-between gap-4 py-4 text-sm  items-center ">
        <p>© 2025 Works Limited. All Rights Reserved.</p>
        <div className="flex gap-4">
          <img
            src="/src/assets/NCDA-ORG-Logo-23-24@1x.png"
            alt="ncda"
            style={{ height: "auto", width: "80px" }}
          />
          <img
            src="/src/assets/prwcc.png"
            alt="prwcc"
            style={{ height: "auto", width: "80px" }}
          />
        </div>
      </div>
    </footer>
    // <footer className="footer">
    //   <p className="footer-heading">
    //     <span>
    //       *The professionals using our tools have previously been employed by
    //       these organizations.
    //     </span>
    //   </p>
    //   <div className="container mx-auto ">
    //     {/* Use flexbox for consistent layout, with appropriate wrapping */}
    //     <div className="flex flex-wrap justify-between py-5">
    //       {/* Zety Section */}
    //       <div className="flex flex-col flex-grow basis-full md:basis-1/4 lg:basis-1/5 mb-8 md:mb-0">
    //         <div>
    //           <h1 className="heading">Zety</h1>
    //           {/* Ensure the paragraph width is flexible or max-width */}
    //           <p className="my-4 max-w-xs sm:max-w-sm break-words">
    //             Zety's resume templates and job-winning resume builder and cover
    //             letter generator are powered by the best career experts and
    //             data-driven career insights.
    //           </p>

    //           <Button
    //             type="primary"
    //             size="large"
    //             className="rounded-full font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
    //             style={{
    //               padding: "15px 25px 13px",
    //             }}
    //           >
    //             Create My Resume
    //           </Button>
    //         </div>
    //       </div>

    //       {/* Navigation Sections - Use consistent flexible sizing */}
    //       <div className="flex flex-grow basis-1/2 sm:basis-1/4 md:basis-1/6 lg:basis-1/6">
    //         <p className="p-title">RESUME</p>
    //         <ul>
    //           {resume.map((item, idx) => (
    //             <li key={idx}>{item}</li>
    //           ))}
    //         </ul>
    //       </div>
    //       <div className="flex flex-grow basis-1/2 sm:basis-1/4 md:basis-1/6 lg:basis-1/6">
    //         <p className="p-title">CV</p>
    //         <ul>
    //           {cv.map((item, idx) => (
    //             <li key={idx}>{item}</li>
    //           ))}
    //         </ul>
    //       </div>
    //       <div className="flex flex-grow basis-1/2 sm:basis-1/4 md:basis-1/6 lg:basis-1/6 mt-4 sm:mt-0">
    //         <p className="p-title">COVER LETTER</p>
    //         <ul>
    //           {coverLetter.map((item, idx) => (
    //             <li key={idx}>{item}</li>
    //           ))}
    //         </ul>
    //       </div>

    //       <div className="flex flex-grow basis-1/2 sm:basis-1/4 md:basis-1/6 lg:basis-1/6 mt-4 sm:mt-0">
    //         <p className="p-title">SUPPORT</p>
    //         <ul>
    //           {support.map((item, idx) => (
    //             <li key={idx}>{item}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="w-full region">
    //     <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
    //       <p className="text-sm font-medium m-0">Choose Your Region</p>
    //       <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
    //         {footerLink.map((item, idx) => (
    //           <span
    //             key={idx}
    //             className="text-sm cursor-pointer hover:underline"
    //           >
    //             {item}
    //           </span>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex container mx-auto flex-col sm:flex-row justify-between gap-4 py-4 text-sm items-center">
    //     <p>© 2025 Works Limited. All Rights Reserved.</p>
    //     <div className="flex gap-4">
    //       <img
    //         src="/src/assets/NCDA-ORG-Logo-23-24@1x.png"
    //         alt="ncda"
    //         style={{ height: "auto", width: "80px" }}
    //       />
    //       <img
    //         src="/src/assets/prwcc.png"
    //         alt="prwcc"
    //         style={{ height: "auto", width: "80px" }}
    //       />
    //     </div>
    //   </div>
    // </footer>
  );
}

export default Footer;
