import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Space, Row, Col, Drawer, Card, Button } from "antd";

import { useState } from "react";
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
                <h1 className=" font-bold-500 w-[550px] heading">
                  Best Online Resume Builder (Free to Try)
                </h1>
                <p style={{ fontSize: "22px" }}>Fast. Easy. Effective.</p>

                <p className="fst-para xs:!w-full xl:!w-[553px] break-words">
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
        <section className="container-fluid mt-6 justify-self-center">
          <div className="w-full">
            {" "}
            <h2 className="section-title  nowrap !text-[30px]">
              Just four simple steps to download your resume:
            </h2>
          </div>
          <div className="flex gap-4 px-20 pt-4 ">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx}>
                <img
                  src="./src/assets/arrow.svg"
                  alt=""
                  className="w-[200px]"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                hoverable
                className="w-[200px] px-4 py-2"
                cover={<img alt={`Step ${step.number}`} src={step.img} />}
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
            ))}
          </div>
        </section>
      </Content>
    </>
  );
}
