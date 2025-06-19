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
} from "antd";

import { Children, useState } from "react";
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
          <h1 className=" text-gray-800 break-words heading ">zety</h1>

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
        <section className="container-fluid mt-6 ">
          <Row
            className="flex justify-self-center justify-center"
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
                <Button size="large" className="content-btn">
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
        <section className="container mt-6 justify-self-center">
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
                lg={{ span: 6 }}
                className="xs:flex xs:justify-center mb-2 "
              >
                <Card
                  key={step.number}
                  hoverable
                  className="lg:w-full !sm:w-[400px] px-4 py-2 card"
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

        {/* {Content part Third page start} */}

        <section className="container mt-6 justify-self-center justify-center">
          <h2 className="section-title text-center">How Can We Help You ?</h2>

          <Row gutter={[16, 16]} className=" " style={{ rowGap: "16px" }}>
            {description.map((item) => (
              <Col
                key={item.key}
                className="w-fit"
                // xs={{ span: 24 }}
                // lg={{ span: 8 }}
              >
                <Descriptions
                  bordered
                  layout="vertical"
                  column={1}
                  className="inline-block max-w-[300px] max-h-[300px]"
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
        <section className="container mt-10 text-center">
          <p className="section-subtitle flex justify-center items-center gap-2 text-base md:text-lg font-medium text-gray-700 mb-6">
            <CheckCircleFilled className="text-green-600" />
            Our resume examples helped people land jobs at Microsoft, Google,
            and other top companies.
          </p>

          <Row gutter={[24, 24]} justify="center">
            {Resumetype.map((item, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                className="flex justify-center"
              >
                <div className="group border rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col items-center bg-white transition duration-300 hover:shadow-lg hover:-translate-y-1">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="mb-4 w-32 h-32 object-contain"
                  />

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3">
                    <Button type="primary">{item.btntext}</Button>
                  </div>

                  <p className="text-center text-base font-medium">
                    {item.title}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </section>
        {/* <section className="container mt-6 justify-self-center ">
          <p className="section-subtitle">
            <span>
              <CheckCircleFilled className="mr-2  text-green-600" />
            </span>
            Our resume examples helped people land jobs at Microsoft, Google,
            and other top companies.
          </p>
          <Row>
            <Col>
              <div
                style={{ width: "100%", height: "100%" }}
                className="border p-5 pb-0 inline-block mb-4 justify-center items-center"
              >
                <img
                  src={Resumetype[0]["img"]}
                  alt=""
                  style={{
                    width: "150px",
                    height: "150px",
                    marginBottom: "30px",
                  }}
                  className="justify-self-center align-middle"
                />
                <Button className="content-btn">
                  {" "}
                  {Resumetype[0]["btntext"]}
                </Button>
                <p className="mt-3 text-center">{Resumetype[0]["title"]}</p>
              </div>
            </Col>
          </Row>
        </section> */}
      </Content>
    </>
  );
}
