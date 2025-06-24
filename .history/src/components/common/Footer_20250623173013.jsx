// import { Row, Col, Button } from "antd";
// import {
//   LinkedinIcon,
//   TwitterIcon,
//   FacebookIcon,
// } from "../../assets/extraImages";

// const resume = [
//   "Resume Builder",
//   "Resume Templates",
//   "Resume Checker",
//   "Resume Examples",
//   "Best Resume Format",
//   "How to Write a Resume",
//   "Resume Help",
// ];
// const cv = [
//   "CV Builder",
//   "CV Templates",
//   "CV Examples",
//   "CV Format",
//   "How to Write a CV",
//   "CV Help",
// ];
// const coverLetter = [
//   "Cover Letter Builder",
//   "Cover Letter Templates",
//   "Cover Letter Examples",
//   "Cover Letter Format",
//   "How to Write a Cover Letter",
//   "Cover Letter Help",
// ];
// const support = [
//   "About",
//   "Pricing",
//   "Contact",
//   "Editorial Guidelines",
//   "Media Mentions",
//   "Accessibility",
//   "Affiliates",
//   "Privacy Policy",
//   "Terms of service",
//   "Cookies & Tracking Policy",
//   "Do Not Sell or Share My Personal Information",
// ];
// const footerLink = [
//   "English (IN)",
//   "English (UK)",
//   "English (US)",
//   "Deutsch Español",
//   "Français (Canada)",
//   " Français (France)",
//   "Italiano Polski",
//   " Portugês (Brasil)",
// ];
// function Footer() {
//   return (
//     <footer className="footer ">
//       <p className="footer-heading">
//         <span>
//           *The professionals using our tools have previously been employed by
//           these organizations.
//         </span>
//       </p>
//       <div className="container mx-auto ">
//         <Row className=" justify-between py-5">
//           <Col xs={{ span: 24 }} lg={{ span: 5 }}>
//             <div className="flex gap-10 lg:flex-col  xs:justify-center sm:justify-between lg:justify-center">
//               <div>
//                 <h1 className="heading inline-block">Zety</h1>
//                 <p className="my-4 w-[250px] break-words ">
//                   Zety's resume templates and job-winning resume builder and
//                   cover letter generator are powered by the best career experts
//                   and data-driven career insights.
//                 </p>

//                 <Button
//                   type="primary"
//                   size="large"
//                   className="rounded-full  font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 "
//                   style={{
//                     padding: "15px 25px 13px",
//                   }}
//                 >
//                   Create My Resume
//                 </Button>
//               </div>

//               <div>
//                 <div>
//                   <div className="flex gap-4 my-4 connection">
//                     <TwitterIcon /> <LinkedinIcon /> <FacebookIcon />
//                   </div>
//                   <div>
//                     <p className="mb-2"> Call us: &nbsp; 800-555-5555</p>
//                     <p>Email: &nbsp; support@zety.com</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>

//           <Col lg={{ span: 3 }} xs={{ span: 2 }}>
//             <p className="p-title">RESUME</p>
//             <ul>
//               {resume.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </Col>
//           <Col lg={{ span: 3 }} xs={{ span: 2 }}>
//             <p className="p-title">CV</p>
//             <ul>
//               {cv.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </Col>
//           <Col lg={{ span: 3 }} xs={{ span: 2 }}>
//             <p className="p-title">COVER LETTER</p>
//             <ul>
//               {coverLetter.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </Col>

//           <Col lg={{ span: 3 }} xs={{ span: 2 }}>
//             <p className="p-title">SUPPORT</p>
//             <ul>
//               {support.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </Col>
//         </Row>
//       </div>

//       <div className="w-full region">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 py-4">
//           <p className="text-sm font-medium !mt-0 p-title text-center sm:text-left w-max">
//             Choose Your Region
//           </p>

//           <div className="flex gap-4 flex-wrap justify-center sm:justify-start items-center max-w-full">
//             {footerLink.map((item, idx) => (
//               <span
//                 key={idx}
//                 className="text-sm cursor-pointer hover:underline whitespace-nowrap" //
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex container mx-auto justify-between gap-4 py-4 text-sm  items-center md:flex-row flex-col ">
//         <p className="w-max">© 2025 Works Limited. All Rights Reserved.</p>
//         <div className="flex gap-4 px-2">
//           <img
//             src="/src/assets/NCDA-ORG-Logo-23-24@1x.png"
//             alt="ncda"
//             style={{ height: "auto", width: "80px" }}
//           />
//           <img
//             src="/src/assets/prwcc.png"
//             alt="prwcc"
//             style={{ height: "auto", width: "80px" }}
//           />
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

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
    <footer className="footer ">
      <p className="footer-heading text-center py-4 text-xs text-gray-600 px-4">
        {" "}
        {/* Added some basic Tailwind for better styling */}
        <span>
          *The professionals using our tools have previously been employed by
          these organizations.
        </span>
      </p>
      <div className="container mx-auto px-4">
        {" "}
        {/* Added px-4 for padding on small screens */}
        <Row gutter={[24, 24]} className="py-5">
          {" "}
          {/* Added gutter for spacing, py-5 for vertical padding */}
          {/* Main Zety Info and Socials */}
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            {" "}
            {/* xs:24 for full width on small, lg:8 for larger screens */}
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 lg:justify-start">
              {" "}
              {/* Flex-col by default, row on large. Adjusted gap. */}
              {/* Zety Description and Button */}
              <div className="flex-1 min-w-0 text-center lg:text-left">
                {" "}
                {/* min-w-0 for flex children, center text on small */}
                <h1 className="heading inline-block text-3xl font-bold mb-4">
                  Zety
                </h1>
                <p className="my-4 break-words text-gray-700 leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {" "}
                  {/* Removed fixed w-[250px], added max-w-sm and mx-auto for better control */}
                  Zety's resume templates and job-winning resume builder and
                  cover letter generator are powered by the best career experts
                  and data-driven career insights.
                </p>
                <Button
                  type="primary"
                  size="large"
                  className="rounded-full font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
                  style={{
                    padding: "15px 25px 13px",
                  }}
                >
                  Create My Resume
                </Button>
              </div>
              {/* Social Icons and Contact Info */}
              <div className="flex-initial mt-6 lg:mt-0 text-center lg:text-left">
                <div className="flex gap-4 my-4 connection justify-center lg:justify-start">
                  {" "}
                  {/* Centered icons on small screens */}
                  <TwitterIcon /> <LinkedinIcon /> <FacebookIcon />
                </div>
                <div className="text-gray-700">
                  <p className="mb-2"> Call us: &nbsp; 800-555-5555</p>
                  <p>Email: &nbsp; support@zety.com</p>
                </div>
              </div>
            </div>
          </Col>
          {/* Resume Links */}
          <Col
            xs={{ span: 12 }}
            sm={{ span: 6 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            {" "}
            {/* Adjusted spans for better responsiveness */}
            <p className="p-title font-semibold text-lg mb-4">RESUME</p>
            <ul>
              {resume.map((item, idx) => (
                <li key={idx} className="mb-2 text-gray-700 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Col>
          {/* CV Links */}
          <Col
            xs={{ span: 12 }}
            sm={{ span: 6 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <p className="p-title font-semibold text-lg mb-4">CV</p>
            <ul>
              {cv.map((item, idx) => (
                <li key={idx} className="mb-2 text-gray-700 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Col>
          {/* Cover Letter Links */}
          <Col
            xs={{ span: 12 }}
            sm={{ span: 6 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <p className="p-title font-semibold text-lg mb-4">COVER LETTER</p>
            <ul>
              {coverLetter.map((item, idx) => (
                <li key={idx} className="mb-2 text-gray-700 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Col>
          {/* Support Links */}
          <Col
            xs={{ span: 12 }}
            sm={{ span: 6 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <p className="p-title font-semibold text-lg mb-4">SUPPORT</p>
            <ul>
              {support.map((item, idx) => (
                <li key={idx} className="mb-2 text-gray-700 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>

      {/* Region Selector */}
      <div className="w-full bg-gray-50 border-t border-b border-gray-200">
        {" "}
        {/* Added background and borders */}
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-gray-800 text-center sm:text-left">
            Choose Your Region
          </p>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-start items-center max-w-full">
            {footerLink.map((item, idx) => (
              <span
                key={idx}
                className="text-sm cursor-pointer hover:underline whitespace-nowrap text-blue-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright and Logos */}
      <div className="flex container mx-auto justify-between gap-4 py-4 text-sm items-center md:flex-row flex-col px-4">
        {" "}
        {/* Added px-4 for consistency */}
        <p className="text-center md:text-left text-gray-600">
          © 2025 Works Limited. All Rights Reserved.
        </p>
        <div className="flex gap-4 px-2">
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
  );
}

export default Footer;
