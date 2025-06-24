import {
  DownOutlined,
  MenuOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import {
  Layout,
  Space,
  Row,
  Col,
  Drawer,
  Card,
  Button,
  Descriptions,
  FloatButton,
} from "antd";

import { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;
const { Meta } = Card;

const steps = [
  {
    img: "./src/assets/step_1@2x.png",
    number: 1,
    description: "Pick a template.",
  },
  {
    img: "./src/assets/step_2@2x.png",
    number: 2,
    description: "Fill in the blanks using expert tips.",
  },
  {
    img: "./src/assets/step_3@2x.png",
    number: 3,
    description: "Personalise your document.",
  },
  {
    img: "./src/assets/step_4@2x.png",
    number: 4,
    description: "And download in DOCX or PDF.",
  },
];
const description = [
  {
    key: "1",
    label: "Resume Builder",
    children:
      "Zety’s resume builder will save you time and provide expert tips every step of the way. Creating a resume has never been easier.",
  },
  {
    key: "2",
    label: "Cover Letter Builder",
    children:
      "Smoothly generate a job-winning cover letter with our drag-and-drop interface.",
  },
  {
    key: "3",
    label: "ATS-Friendly Resume Templates",
    children:
      "Grab recruiters’ attention with one of 18 professional resume templates designed by career experts.",
  },
  {
    key: "4",
    label: "Free Career Advice Resources",
    children:
      "Consciously shape your career with helpful guides and resume examples. Writing the perfect job application? Asking for a raise? Learn it all (and more) on our blog.",
  },
  {
    key: "5",
    label: "Resume Check",
    children:
      "Score and check your resume in real-time with our resume checker. Get actionable tips to improve your resume.",
  },
  {
    key: "6",
    label: "Ready-Made Content Suggestions",
    children:
      "Discover expert-crafted content suggestions and create a professional job application in minutes.",
  },
];
const Resumetype = [
  {
    img: "/src/assets/imagepicture.svg",
    title: "Accpunting Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Bartender Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Cashier Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Customer Service Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Project Manager Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Receptionist Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Registered Nurse Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Sales Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Server Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Software Engineer Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Student Resume",
    btntext: "See The Example",
  },
  {
    img: "/src/assets/imagepicture.svg",
    title: "Teacher Resume",
    btntext: "See The Example",
  },
];

export default function CustomHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* {Header part start} */}
      <Header className="container-fluid p-0  grid">
        <div className="flex items-center justify-between  px-4 xl:mx-40 ">
          <h1 className=" heading ">zety</h1>

          <div className="right-header flex justify-between gap-2 xs:hidden xl:flex">
            <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium ">
              {["Tools", "Resume", "CV", "Cover Letter", "About"].map(
                (item) => (
                  <div key={item} className="cursor-pointer flex items-center">
                    <Space>
                      <span>{item}</span>
                      <DownOutlined />
                    </Space>
                  </div>
                )
              )}
            </nav>

            <Button
              type="primary"
              size="large"
              className="rounded-full  font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
              style={{
                padding: "15px 25px 13px",
              }}
            >
              MY ACCOUNT
            </Button>
          </div>

          <div className="right-header xs:flex xl:hidden">
            <Button
              size="large"
              onClick={showDrawer}
              className="text-2xl !text-gray-800 !border-gray-600  "
            >
              <MenuOutlined />
            </Button>
            <Drawer
              title="Menu"
              closable={{ "aria-label": "Close Button" }}
              onClose={onClose}
              open={open}
            >
              <Space direction="vertical">
                {["Tools", "Resume", "CV", "Cover Letter", "About"].map(
                  (item) => (
                    <h3 key={item}>{item}</h3>
                  )
                )}
              </Space>
            </Drawer>
          </div>
        </div>
      </Header>
      {/* {Header part ends} */}

      {/* {Content part start} */}

      <Content>
        {/* {Content part First page start} */}
        <section className="container-fluid mt-12 ">
          <Row
            className="flex-center"
            style={{
              backgroundImage:
                "url('./src/assets/triangles-background@1x.jpg')",
            }}
          >
            <Col
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              className="px-4 content-center "
            >
              <div className="  ">
                <h1 className=" font-bold-500 lg:w-[550px] heading">
                  Best Online Resume Builder (Free to Try)
                </h1>
                <p style={{ fontSize: "22px" }}>Fast. Easy. Effective.</p>

                <p className="fst-para xs:w-[200px] xl:!w-[553px] break-words">
                  Writing a resume is a daunting task. Nothing but stress,
                  confusion, and wasting precious hours on making an attractive
                  template. But not with Zety. Let us take over.
                </p>
                <Button
                  size="large"
                  className="content-btn"
                  onClick={() => navigate("/mastertemplate-1")}
                >
                  MAKE YOUR RESUME NOW
                </Button>
              </div>
            </Col>

            <Col
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              className="px-4"
            >
              <div className="lg:px-4  image-part xs:!w-full ">
                <img
                  src="/src/assets/resume-builder-template@1x.png"
                  alt="/src/assets/imagepicture"
                  className="relative xs:justify-self-center fst-page-img z-10"
                />
              </div>
            </Col>
          </Row>
        </section>
        {/* {Content part First page end} */}

        {/* {Content part Second page start} */}
        <section className="md:container mt-12    md:justify-self-center">
          <div>
            {" "}
            <h2 className=" section-title">
              Just four simple steps to download your resume:
            </h2>
          </div>
          <div className="flex gap-4 px-20   pt-4 xs:hidden lg:flex">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx}>
                <img
                  src="./src/assets/arrow.svg"
                  alt=""
                  className="w-[350px]"
                />
              </div>
            ))}
          </div>
          <Row gutter={16}>
            {steps.map((step) => (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                className="xs:flex xs:justify-center mb-2 "
              >
                <Card
                  key={step.number}
                  hoverable
                  className=" xs:w-[250px]   lg:w-full  px-4 py-2 card"
                  cover={
                    <img
                      alt={`Step ${step.number}`}
                      src={step.img}
                      className="card-img"
                    />
                  }
                >
                  <Meta
                    title={
                      <div
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#AAc8F8",
                          color: "white",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          margin: "0 auto",
                        }}
                      >
                        {step.number}
                      </div>
                    }
                    description={step.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        {/* {Content part second page end} */}

        {/* Brand section start */}
        <section className="flex-center mt-12 brand-section">
          <div>
            <p className="w-[200px] breal-words">
              Our customers have been hired by: *
            </p>
            <svg
              class="_svg_yvvy6_159"
              color="currentColor"
              viewBox="0 0 94 21"
              aria-label="microsoft"
            >
              <g>
                <g fill="#4f5c70">
                  <path d="M0 5.247V9.99h9.498V.502H0v4.745ZM10.496.553c-.029.021-.05 2.16-.05 4.744V9.99H19.944V.5h-4.697c-2.588.002-4.73.024-4.75.053ZM86.707 3.715c-.767.167-1.577.737-1.922 1.365-.3.555-.416 1.125-.416 2.008v.778l-.71.021-.716.022-.021.817-.022.825h1.468v6.932h2.045V9.551h2.994v2.206c.008 2.633.059 3.13.38 3.78.27.524.693.875 1.25 1.028.467.125 1.484.103 2.01-.045l.453-.132v-1.634l-.417.138c-.671.226-1.197.088-1.46-.4-.117-.205-.132-.504-.154-2.592l-.021-2.35H93.5V7.875h-2.044V5.376l-.197.05c-.117.022-.576.162-1.022.3l-.826.255v1.926l-1.505-.022-1.505-.021.022-.854c.029-.934.124-1.204.517-1.496.271-.196.898-.249 1.33-.103l.337.117V4.66c0-.737-.015-.867-.124-.904-.22-.086-1.441-.107-1.776-.041ZM41.228 4.436c-.38.233-.563.554-.563 1 0 .716.542 1.175 1.323 1.108.663-.058 1.074-.482 1.074-1.116 0-.438-.146-.693-.547-.97-.315-.21-.96-.226-1.287-.022ZM25.93 10.502v5.983h1.971l-.015-4.598c-.016-2.533 0-4.599.02-4.599.022 0 .87 2.072 1.893 4.599l1.856 4.604.73-.021.73-.022 1.805-4.546c.993-2.503 1.826-4.57 1.848-4.59.021-.03.045 2.028.045 4.561v4.612h2.044V4.518h-2.816l-1.672 4.1c-.92 2.263-1.739 4.255-1.81 4.43l-.147.329-.634-1.605c-.35-.875-1.14-2.867-1.753-4.43l-1.117-2.824h-2.973v5.984h-.004ZM47.626 7.835c-1.483.336-2.644 1.394-3.14 2.883-.226.657-.285 2.095-.117 2.803.263 1.103 1.059 2.167 1.98 2.65 1.139.59 2.84.649 4.104.153l.425-.167.037-.934c.021-.512.029-.926.021-.926s-.226.117-.489.255c-1.22.679-2.585.562-3.382-.278-.6-.629-.833-1.533-.68-2.6.147-1.013.731-1.803 1.578-2.116.796-.3 1.928-.161 2.66.337.138.087.27.167.292.167.021 0 .029-.438.015-.978l-.021-.979-.489-.161c-.639-.21-2.077-.269-2.794-.11ZM56.32 7.806c-.717.103-1.28.517-1.636 1.211l-.183.35-.008-.75v-.751l-1 .021-1.01.022-.02 4.283-.016 4.291h2.036l.022-2.65.021-2.64.205-.438c.32-.68.693-1.022 1.25-1.125.371-.066.979.016 1.3.183l.205.109v-.984c0-.708-.03-1-.088-1.043-.152-.09-.728-.14-1.079-.09ZM60.854 7.835c-1.585.358-2.71 1.467-3.111 3.066-.168.663-.175 2-.008 2.692.343 1.454 1.439 2.555 2.907 2.942.629.161 1.906.161 2.578-.016 1.308-.329 2.368-1.249 2.82-2.43.262-.721.379-1.503.328-2.313-.074-1.32-.424-2.174-1.168-2.925-.467-.46-.804-.671-1.505-.92-.54-.197-2.161-.247-2.84-.096Zm2.148 1.745c.489.22.927.73 1.104 1.263.109.336.138.634.138 1.408-.008.854-.03 1.043-.175 1.409-.212.54-.518.883-.985 1.124-.322.167-.468.19-1.03.19-.723 0-1.118-.124-1.556-.488-.687-.591-1-2-.709-3.24.205-.847.584-1.358 1.242-1.664.518-.249 1.453-.249 1.97-.002ZM69.49 7.836c-.863.241-1.63.846-1.928 1.517-.241.547-.241 1.54.008 2.058.3.613.635.876 1.928 1.496.65.313 1.242.642 1.314.722.19.212.241.758.088.992-.417.634-1.965.57-3.127-.138l-.425-.255v1.963l.263.109c.81.336 2.373.445 3.228.225.942-.24 1.636-.75 1.986-1.466.146-.308.175-.475.175-1.059 0-.57-.021-.745-.153-.992-.366-.692-.834-1.042-2.148-1.634-.964-.424-1.227-.65-1.285-1.087-.138-1 1.373-1.292 2.849-.547l.35.183-.022-.934-.02-.926-.439-.138c-.598-.19-2.109-.24-2.642-.09ZM77.1 7.865c-1.03.255-1.928.876-2.456 1.693-.759 1.19-.926 3.13-.395 4.569.658 1.758 2.52 2.766 4.632 2.504 1.206-.146 1.864-.446 2.602-1.197.891-.896 1.234-1.824 1.234-3.328 0-1.467-.343-2.43-1.147-3.241-.541-.533-1.008-.796-1.776-.992-.722-.189-1.964-.189-2.694-.008Zm2.346 1.737c.409.22.788.658.985 1.162.138.365.168.57.168 1.379.007 1.496-.3 2.196-1.155 2.628-.388.19-.512.212-1.06.212-.788-.008-1.278-.197-1.687-.663-.475-.547-.614-1-.621-2.066 0-1.46.329-2.175 1.22-2.628.438-.22.49-.226 1.155-.205.526.022.767.065.995.181ZM40.833 12.18v4.306h2.044l-.015-4.29-.022-4.284-1-.022-1.009-.021v4.31h.002ZM0 15.755V20.5h9.498v-9.489H0v4.745ZM10.46 15.734l.02 4.729 4.734.021 4.725.016v-9.489h-9.493l.013 4.723Z"></path>
                </g>
              </g>
              <defs>
                <clipPath>
                  <path fill="#fff" d="M0 .5h93.5v20H0z"></path>
                </clipPath>
                <clipPath>
                  <path fill="#fff" d="M0 20.5h93.5V.5H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>
        </section>
        {/* Brand section end */}

        {/* {Content part Third page start} */}

        <section className="sm:container  sm:items-self-center mt-6  flex-center flex-col ">
          <h2 className="section-title text-center">How Can We Help You ?</h2>

          <Row gutter={[16, 16]} style={{ rowGap: "16px" }}>
            {description.map((item) => (
              <Col
                md={{ span: 6 }}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                key={item.key}
                className="xs:flex xs:justify-center"
              >
                <Descriptions
                  bordered
                  layout="vertical"
                  column={1}
                  className="inline-block max-w-[300px] max-h-[300px] xs:w-full "
                  items={[
                    {
                      key: item.key,
                      label: item.label,
                      children: item.children,
                    },
                  ]}
                />
              </Col>
            ))}
          </Row>
        </section>

        {/* {Content part third page end} */}

        {/* {Content part Fourth page start} */}
        <section className="sm:container mt-12 text-center justify-self-center">
          <p className="section-subtitle flex-center  gap-2 mb-6 bg-[#f4f9fd]">
            <CheckCircleFilled className="text-green-600" />
            Our resume examples helped people land jobs at Microsoft, Google,
            and other top companies.
          </p>

          <Row gutter={[24, 24]} justify="center">
            {Resumetype.map((item, index) => (
              <Col
                key={index}
                md={{ span: 8 }}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                className="xs:flex xs:justify-center md:flex-center"
              >
                <div className=" resume-card border rounded-2xl shadow-md p-6 w-full  xs:w-[250px] flex-center flex-col  transition-all ">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="mb-4 w-32 h-32 object-contain"
                  />
                  <Button
                    className="resume-btn  content-btn mb-3 opacity-0"
                    type="primary"
                  >
                    {item.btntext}
                  </Button>
                  <p className="text-center text-base font-medium">
                    {item.title}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </section>
        {/* {Content part fourth page end} */}

        {/* {Content part Fifth page start} */}

        <section className="conatiner bg-[#2488e3] mt-12 flex justify-start flex-col align-middle px-20">
          <div className="md:ml-20 last-section">
            <h2 className="  last-sec-heading pt-20">
              Try Our Easy-To-Use Resume Builder
            </h2>
            <div className="flex justify-start  md:w-[700px]">
              <p className="last-sec-para  text-white  ">
                Experience our intuitive resume builder and take a shortcut to
                your dream career. Discover why thousands of job seekers and HR
                experts trust us. Create your best resume quickly and easily
                today.
              </p>
            </div>
            <div className="flex justify-start">
              <Button className="content-btn  last-btn mb-20 " type="primary">
                Build Your Resume Now
              </Button>
            </div>
          </div>
        </section>

        {/* {Content part Fifth page end} */}
      </Content>
      {/* {Content part end} */}
      {/* <FloatButton type="primary"></FloatButton> */}
    </>
  );
}
