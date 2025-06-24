import {
  CaretDownFilled,
  MenuOutlined,
  CheckCircleFilled,
  EditOutlined,
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
import {
  MicrosoftIcon,
  WalmartIcon,
  AmazonIcon,
  OrangeIcon,
  FedexIcon,
  AttIcon,
} from "../../assets/extraImages";
import { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
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
      <Header className="container-fluid p-0  grid ">
        <div className="flex items-center justify-between  px-4 xl:mx-40 ">
          <h1 className=" heading-fst ">zety</h1>

          <div className="right-header flex justify-between gap-2 xs:hidden xl:flex">
            <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium ">
              {["Tools", "Resume", "CV", "Cover Letter", "About"].map(
                (item) => (
                  <div key={item} className="cursor-pointer flex items-center">
                    <Space>
                      <span>{item}</span>
                      <CaretDownFilled />
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
            className="flex-center "
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
                <h1 className=" !font-bold-700 lg:w-[550px] heading">
                  Best Online Resume Builder (Free to Try)
                </h1>
                <p style={{ fontSize: "22px" }}>Fast. Easy. Effective.</p>

                <p className="fst-para xs:w-[200px] ">
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
        <section className="md:container mt-24    md:justify-self-center">
          <div>
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
                key={step.number}
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

        <section className="brand-section mt-24 px-4 align-middle">
          <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
            <p className="mb-6 lg:mb-0 lg:mr-8 text-center lg:text-left">
              Our customers have been hired by:
            </p>
            <div className="flex flex-wrap justify-between gap-20">
              <MicrosoftIcon />
              <AmazonIcon />
              <AttIcon />
              <WalmartIcon />
              <FedexIcon />
              <OrangeIcon />
            </div>
          </div>
        </section>

        {/* {Content part Third page start} */}

        <section className="sm:container  sm:items-self-center mt-24  flex-center flex-col ">
          <h2 className="section-title text-center text[#07142b]">
            How Can We Help You ?
          </h2>
          <div className="h-full">
            <Row gutter={[16, 16]} style={{ rowGap: "16px" }}>
              {description.map((item) => (
                <Col
                  md={{ span: 8 }}
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  key={item.key}
                  className="flex items-stretch justify-center "
                >
                  <div className="h-full w-[200px] border-l p-2 border-[#eff2fa]">
                    <h4 className="mb-2 text-[16px] font-[500] font-[#3b313e]">
                      {item.label}
                    </h4>
                    <p clqassName="text-[16px] font-[400] w-[200px] text-[#443f5b]">
                      {item.children}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
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
            <div className="flex justify-start  md:w-[500px]">
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
        <Footer />
      </Content>
      {/* {Content part end} */}
      <div className="fixed bottom-6 left-6 z-50 group ">
        <FloatButton
          icon={<EditOutlined />}
          type="primary"
          style={{
            width: 48,
            height: 48,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
          tooltip={<div>MAKE YOUR RESUME NOW</div>}
          onClick={() => navigate("/mastertemplate-1")}
        />
      </div>
    </>
  );
}
